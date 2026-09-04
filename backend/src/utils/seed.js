const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Menjalankan seeder database...');

  // 1. Lokasi Kantor Utama
  const officeLocation = await prisma.location.upsert({
    where: { id: 'loc-main-hq' },
    update: {},
    create: {
      id: 'loc-main-hq',
      name: 'Kantor Pusat Jakarta',
      address: 'Jl. Jenderal Sudirman No. 45, Jakarta Selatan',
      lat: -6.2088,
      lng: 106.8456,
      radius: 50.0, // 50 meter batas absensi
    },
  });

  // 2. Departemen
  const hrdDepartment = await prisma.department.upsert({
    where: { id: 'dept-hrd-01' },
    update: {},
    create: {
      id: 'dept-hrd-01',
      name: 'Human Resources',
      locationId: officeLocation.id,
    },
  });

  // 3. User Admin Awal
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('admin123', salt);

  await prisma.user.upsert({
    where: { email: 'admin@hrd.com' },
    update: {},
    create: {
      nik: 'EMP001',
      name: 'Super Administrator',
      email: 'admin@hrd.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      position: 'HR Director',
      baseSalary: 15000000.0,
      departmentId: hrdDepartment.id,
      isActive: true,
    },
  });

  // 4. Pengaturan Sistem
  const defaultSettings = [
    { key: 'WORK_START_TIME', value: '08:00' },
    { key: 'WORK_END_TIME', value: '17:00' },
    { key: 'LATE_TOLERANCE_MINUTES', value: '15' },
    { key: 'ANNUAL_LEAVE_QUOTA', value: '12' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Seeder selesai dijalankan. Admin default: admin@hrd.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
