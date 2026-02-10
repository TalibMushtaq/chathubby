# TODO

## Backlog

- [ ] add anonymous entry in rooms chat
- [ ] add inbox endpoint: `GET /api/dm/my-chats` (list all DM chats)
- [x] add edit for chat sent , time 5 min
- [ ] add DM pagination (cursor / infinite scroll)
- [x] add Socket.io realtime for DMs (emit on REST send)
- [ ] add Socket.io system for ChatRoom messages (socket-first)
- [ ] add “mark as read” / unread count
- [ ] Store user snapshot in session

## In Progress

- [x] add Delete api to delete sent message (30 min window, soft delete)

## Completed ✓

- [x] Auth middleware: session check + fetch user from DB + attach `req.user`
- [x] Prisma DM schema: `DirectChat` + `Message` with unique pair handling
- [x] `POST /api/dm/start-dm/:userId` (create/find DM chat)
- [x] `POST /api/dm/:directChatId/message` (send message)
- [x] `GET /api/dm/:directChatId/messages` (fetch last 50 messages)
- [x] Tested all 3 DM endpoints successfully in Postman
