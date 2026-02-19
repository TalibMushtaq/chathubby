CREATE UNIQUE INDEX unique_pending_join_request
ON "RoomJoinRequest" ("roomId", "userId")
WHERE status = 'PENDING';
