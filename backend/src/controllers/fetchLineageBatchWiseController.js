import { populateQueue,processOneJob,runWorker } from "../services/fetchLineageBatchWise.js";
  
  /**
   * ➕ Fill queue
   */
  export const fillQueue = async (req, res) => {
    const data = await populateQueue();
    res.json({
      message: "Queue populated",
      count: data.length
    });
  };
  
  /**
   * Process one job
   */
  export const runOne = async (req, res) => {
    const result = await processOneJob();
    res.json(result);
  };
  
  /**
   * Run full worker
   */
  export const runAll = async (req, res) => {
    runWorker(); // don't await (runs in background)
  
    res.json({
      message: "Worker started in background"
    });
  };