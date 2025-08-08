const Car = require("../models/car.schema");
const Rental = require("../models/rentals.schema");
const paystack = require("../utils/paystack");

exports.rentCar = async (req, res) => {
  const { carId } = req.params;
  const userId = req.user.id;
  const { startDate, endDate, totalPrice } = req.body;

  try {
    // Find the car by ID
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check if the car is already rented
    if (car.isRented) {
      return res.status(400).json({ message: "Car is already rented" });
    }

    // Create rental record
    const rental = await Rental.create({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
      paymentStatus: "pending",
    });


    
    car.status = 'pending';
    await car.save();

    return res.status(200).json({ message: "Rental created. Proceed to payment.", rental });
  } catch (error) {
    console.error("Error renting car:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.initializeRentalPayment = async (req, res) => {
  const { carId } = req.params;
  const userId = req.user.id;
  const { email, amount, rentalId } = req.body;

  try {
    // Optionally, validate car, user, and rental here

    const paymentInit = await paystack.initializePayment(email, amount, {
      carId,
      userId,
      rentalId,
    });
    return res
      .status(200)
      .json({
        authorization_url: paymentInit.data.authorization_url,
        reference: paymentInit.data.reference,
      });
  } catch (error) {
    console.error("Error initializing payment:", error.response?.data || error.message);
    return res.status(500).json({ message: "Payment initialization failed" });
  }
};

// ...existing code...

exports.verifyRentalPayment = async (req, res) => {
  const { reference, rentalId } = req.query;
  try {
    const verification = await paystack.verifyPayment(reference);
    if (verification.data.status === "success") {
      await Rental.findByIdAndUpdate(rentalId, {
        paymentStatus: "paid",
        paymentReference: reference,
        status: "confirmed",
      });

      // Mark car as rented only after payment success
      const rental = await Rental.findById(rentalId);
      if (rental) {
        await Car.findByIdAndUpdate(rental.carId, {
          isRented: true,
          isAvailable: false,
          rentedBy: rental.userId,
          status: 'approved'
        });
      }

      return res.status(200).json({ message: "Payment verified successfully", data: verification.data });
    } else {
      await Rental.findByIdAndUpdate(rentalId, {
        paymentStatus: "failed",
        status: "cancelled",
      });

      const rental = await Rental.findById(rentalId);
      if (rental) {
        await Car.findByIdAndUpdate(rental.carId, {
          isRented: false,
          isAvailable: true,
          rentedBy: null,
          status: 'not-rented'
        });
      }

      return res.status(400).json({ message: "Payment not successful, rental cancelled." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error.message);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};

exports.paystackCallback = async (req, res) => {
  const { reference, rentalId } = req.query;

  if (!reference || !rentalId) {
    return res.status(400).send('Missing reference or rentalId');
  }

  try {
    const verification = await paystack.verifyPayment(reference);

    if (verification.data.status === 'success') {
      await Rental.findByIdAndUpdate(rentalId, {
        paymentStatus: 'paid',
        paymentReference: reference,
        status: 'confirmed'
      });
      return res.redirect(`/payment-success?rentalId=${rentalId}`);
    } else {
      await Rental.findByIdAndUpdate(rentalId, {
        paymentStatus: "failed",
        status: "cancelled",
      });

      const rental = await Rental.findById(rentalId);
      if (rental) {
        await Car.findByIdAndUpdate(rental.carId, {
          isRented: false,
          isAvailable: true,
          rentedBy: null,
          status: 'not-rented'
        });
      }

      return res.redirect(`/payment-failed?rentalId=${rentalId}`);
    }
  } catch (error) {
    console.error('Error in payment callback:', error.response?.data || error.message);
    return res.redirect(`/payment-error?rentalId=${rentalId}`);
  }
};