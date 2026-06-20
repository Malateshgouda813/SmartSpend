const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
    try {
       const { title, amount, category, type } = req.body;

       const expense = await Expense.create({
    user: req.user.id,
    title,
    amount,
    category,
    type
});

        res.status(201).json(expense);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateExpense = async (req, res) => {
    try {

        const expense = await Expense.findById(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        if (
            expense.user.toString() !== req.user.id
        ) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updatedExpense =
            await Expense.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.status(200).json(updatedExpense);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteExpense = async (req, res) => {
    try {

        const expense = await Expense.findById(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        if (
            expense.user.toString() !== req.user.id
        ) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await Expense.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};
