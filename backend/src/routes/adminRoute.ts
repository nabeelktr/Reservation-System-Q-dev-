import express,{Application} from 'express'
import AdminController from '../controller/admin-controller';


const adminRoute:Application = express();

const controller = new AdminController();


adminRoute.post('/get-available-rooms', controller.getAvailableRooms.bind(controller))
adminRoute.post('/book-room', controller.bookRoom.bind(controller))
adminRoute.get('/get-bookings', controller.getBookings.bind(controller))
adminRoute.post('/cancel-booking', controller.cancelBooking.bind(controller))

export default adminRoute;