import 'package:flutter/material.dart';
import 'hrd_add_employee.dart';
import 'hrd_cv_screening.dart';

class HrdDashboard extends StatelessWidget {
  const HrdDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HRD Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
          )
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Text('Absensi Real-time Hari Ini', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          // Live Attendance Horizontal List
          SizedBox(
            height: 100,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 5,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(right: 12.0),
                  child: Column(
                    children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundImage: NetworkImage('https://ui-avatars.com/api/?name=User+$index'),
                        child: Align(
                          alignment: Alignment.bottomRight,
                          child: CircleAvatar(radius: 10, backgroundColor: Colors.green, child: Icon(Icons.check, size: 12, color: Colors.white)),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text('User $index', style: const TextStyle(fontSize: 12)),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 24),
          const Text('Menu Utama', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.1,
            children: [
              _buildMenuCard(context, Icons.person_add, 'Tambah Karyawan', const HrdAddEmployee()),
              _buildMenuCard(context, Icons.approval, 'Approval Izin/Cuti', null),
              _buildMenuCard(context, Icons.campaign, 'Buat Pengumuman', null),
              _buildMenuCard(context, Icons.payments, 'Payroll System', null),
              _buildMenuCard(context, Icons.smart_toy, 'AI CV Screening', const HrdCvScreening()),
              _buildMenuCard(context, Icons.document_scanner, 'Generate Paklaring', null),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildMenuCard(BuildContext context, IconData icon, String title, Widget? targetPage) {
    return InkWell(
      onTap: () {
        if (targetPage != null) {
          Navigator.push(context, MaterialPageRoute(builder: (_) => targetPage));
        }
      },
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 40, color: const Color(0xFF0284C7)),
            const SizedBox(height: 12),
            Text(title, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}
