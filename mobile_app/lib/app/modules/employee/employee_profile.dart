import 'package:flutter/material.dart';

class EmployeeProfile extends StatelessWidget {
  const EmployeeProfile({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Center(
            child: CircleAvatar(
              radius: 50,
              backgroundImage: NetworkImage('https://ui-avatars.com/api/?name=Syafiq&size=200'),
            ),
          ),
          const SizedBox(height: 16),
          const Center(child: Text('Muhammad Syafiq', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold))),
          const Center(child: Text('NIK: EMP2026001', style: TextStyle(color: Colors.grey))),
          const SizedBox(height: 24),
          _buildInfoCard(Icons.work, 'Jabatan', 'Principal Full-Stack Developer'),
          _buildInfoCard(Icons.calendar_month, 'Masa Kontrak', 'Jan 2026 - Jan 2028 (2 Tahun)'),
          _buildInfoCard(Icons.location_on, 'Alamat', 'Singaparna, Tasikmalaya, Jawa Barat'),
          const SizedBox(height: 16),
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: const Icon(Icons.receipt_long, color: Colors.green),
              title: const Text('Slip Gaji Bulan Ini'),
              trailing: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green, foregroundColor: Colors.white),
                child: const Text('Download'),
              ),
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
            icon: const Icon(Icons.logout),
            label: const Text('Log Out'),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
          )
        ],
      ),
    );
  }

  Widget _buildInfoCard(IconData icon, String title, String value) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Icon(icon, color: const Color(0xFF0284C7)),
        title: Text(title, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        subtitle: Text(value, style: const TextStyle(fontSize: 16, color: Colors.black87, fontWeight: FontWeight.w500)),
      ),
    );
  }
}
