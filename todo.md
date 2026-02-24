# TODO

## Backlog

- [ ] add DM pagination (cursor / infinite scroll)
- [ ] add “mark as read” / unread count
- [ ] Add File send support for both room chat and dm's
- [ ] Add Delete , Update to the room chat
- [ ] Add forgot Password endpoint

## In Progress

## Completed ✓

- [x] Add proper setError in signup form
- [x] Auth middleware: session check + fetch user from DB + attach `req.user`
- [x] Prisma DM schema: `DirectChat` + `Message` with unique pair handling
- [x] `POST /api/dm/start-dm/:userId` (create/find DM chat)
- [x] `POST /api/dm/:directChatId/message` (send message)
- [x] `GET /api/dm/:directChatId/messages` (fetch last 50 messages)
- [x] Tested all 3 DM endpoints successfully in Postman
- [x] add inbox endpoint: `GET /api/dm/my-chats` (list all DM chats)
- [x] add edit for chat sent , time 5 min
- [x] add Socket.io realtime for DMs (emit on REST send)
- [x] add Delete api to delete sent message (30 min window, soft delete)
- [x] add Socket.io system for ChatRoom messages (socket-first)
- [x] Store user snapshot in session
