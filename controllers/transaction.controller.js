import { sql } from "../config/db.config.js";

const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Provide all details correctly",
      });
    }

    const transaction = await sql`
        INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category}) RETURNING *
        `;

    res.status(200).json({
      success: true,
      transaction: transaction[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const { userId } = req.params;

    const transaction =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (transaction.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getSummary = async (req,res) => {
     try {
       const { userId } = req.params;

       const balanceResult =
         await sql`SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userId}`;

         const incomeResult =
           await sql`SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
        
        const expansesResult =
             await sql`SELECT COALESCE(SUM(amount),0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

       res.status(200).json({
         success: true,
         balance: balanceResult[0].balance,
         income: incomeResult[0].income,
         expanse: expansesResult[0].expenses,
       });
     } catch (error) {
       console.log(error.message);
       res.status(500).json({
         success: false,
         message: "Something went wrong",
       });
     }
}

export { createTransaction, getAllTransaction, deleteTransactions, getSummary };
