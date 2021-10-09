-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "deviceIp" TEXT DEFAULT E'127.0.0.1';

-- CreateTable
CREATE TABLE "Device" (
    "ip" TEXT NOT NULL,
    "hostname" TEXT,
    "location" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_ip_key" ON "Device"("ip");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_deviceIp_fkey" FOREIGN KEY ("deviceIp") REFERENCES "Device"("ip") ON DELETE SET NULL ON UPDATE CASCADE;
