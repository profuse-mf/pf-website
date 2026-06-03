import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import partnersRouter from "./partners";
import applicationRouter from "./application";
import crmRouter from "./crm";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(partnersRouter);
router.use(applicationRouter);
router.use(crmRouter);

export default router;
