const db = require('../../../config/db.config');
const CardCheck = db.CartCheck;

// Function to calculate the amountDue
const calculateAmountDue = (installmentNumber, installmentValue, totalDue) => {
    return installmentNumber * installmentValue - totalDue;
};

// Function to calculate the totalDue
const calculateTotalDue = (installmentQuantity, installmentValue) => {
    return installmentQuantity * installmentValue;
};

// Create a new CartCheck
exports.createCartCheck = async (req, res) => {
    try {
        const { name, establishment, card, purchaseDate, installmentNumber, installmentQuantity,
            installmentValue, lastInstallmentDate } = req.body;

        // Calculate totalDue
        const totalDue = calculateTotalDue(installmentQuantity, installmentValue);

        // Calculate amountDue
        const amountDue = calculateAmountDue(installmentNumber, installmentValue, totalDue);


        // Create the new CartCheck
        const newCartCheck = await CardCheck.create({
            name,
            establishment,
            card,
            purchaseDate,
            installmentNumber,
            installmentQuantity,
            installmentValue,
            amountDue,
            totalDue,
            lastInstallmentDate
        });

        res.status(201).json(newCartCheck);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create CartCheck', error: err.message });
    }
};

// Get a CartCheck by ID
exports.getCartCheckById = async (req, res) => {
    try {
        const cartCheck = await CardCheck.findByPk(req.params.id, { attributes: ['id', 'name', 'establishment', 'card', 'purchaseDate', 'installmentNumber', 'installmentQuantity', 'installmentValue', 'amountDue', 'totalDue', 'lastInstallmentDate'] });
        if (!cartCheck) {
            return res.status(404).json({ message: 'CartCheck not found' });
        }
        res.status(200).json(cartCheck);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get CartCheck', error: err.message });
    }
};

// Get all CartChecks
exports.getAllCartChecks = async (req, res) => {
    try {
        const cartChecks = await CardCheck.findAll({ attributes: ['id', 'name', 'establishment', 'card', 'purchaseDate', 'installmentNumber', 'installmentQuantity', 'installmentValue', 'amountDue', 'totalDue', 'lastInstallmentDate'] });
        res.status(200).json(cartChecks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get CartChecks', error: err.message });
    }
};

// Delete a CartCheck by ID
exports.deleteCartCheckById = async (req, res) => {
    try {
        const cartCheckId = req.params.id;
        const cartCheck = await CardCheck.findByPk(cartCheckId);
        if (!cartCheck) {
            return res.status(404).json({ message: `CartCheck with id ${cartCheckId} not found` });
        }
        await cartCheck.destroy();
        res.status(200).json({ message: `CartCheck with id ${cartCheckId} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error deleting CartCheck with id ${req.params.id}`, error: err.message });
    }
};

// Update a CartCheck by ID
exports.updateCartCheckById = async (req, res) => {
    try {
        const { id, name, establishment, card, purchaseDate, installmentNumber, installmentQuantity, installmentValue, amountDue, totalDue, lastInstallmentDate } = req.body;
        let cartCheck = await CardCheck.findByPk(id);
        if (!cartCheck) {
            return res.status(404).json({ message: `CartCheck with id ${id} not found` });
        }
        cartCheck = await cartCheck.update({ name, establishment, card, purchaseDate, installmentNumber, installmentQuantity, installmentValue, amountDue, totalDue, lastInstallmentDate }, { returning: true });
        res.status(200).json(cartCheck);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error updating CartCheck with id ${req.params.id}`, error: err.message });
    }
};
