import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService()

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id
    const { email, text } = params;
    let user_id = null;

    const userAlreadyExists = await usersService.findByEmail(email);

    if(!userAlreadyExists) {
      const user = await usersService.create(email);
      await connectionsService.create({ socket_id, user_id: user.id }); 
      user_id = user.id;

    } else {
      const connection = await connectionsService.findByUserId(userAlreadyExists.id);
      user_id = userAlreadyExists.id;

      if(!connection) {
        await connectionsService.create({ socket_id, user_id: userAlreadyExists.id }); 
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection); 
      }
    }

    await messagesService.create({text, user_id});
  });
});