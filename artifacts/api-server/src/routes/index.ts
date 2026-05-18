import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import partnersRouter from "./partners";
import applicationRouter from "./application";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(partnersRouter);
router.use(applicationRouter);

export default router;
