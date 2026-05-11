import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import partnersRouter from "./partners";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(partnersRouter);

export default router;
