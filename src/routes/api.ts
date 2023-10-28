import { Router } from "express"
import { ApiController } from "../controllers/ApiController"

const router = Router()


router.get('/users',ApiController.getByQuery)
router.post('/files',ApiController.create)


export default router