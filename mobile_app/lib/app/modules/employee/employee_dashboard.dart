import 'package:flutter/material.dart';
import 'face_attendance_screen.dart';
import 'employee_profile.dart';
import 'leave_request_screen.dart';

class EmployeeDashboard extends StatefulWidget {
  const EmployeeDashboard({super.key});

  @override
  State<EmployeeDashboard> createState() => _EmployeeDashboardState();
}

class _EmployeeDashboardState extends State<EmployeeDashboard> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomeTab(),
    const LeaveRequestScreen(),
    const EmployeeProfile(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Buka Kamera Absensi Wajah
          Navigator.push(context, MaterialPageRoute(builder: (_) => const FaceAttendanceScreen()));
        },
        backgroundColor: const Color(0xFF0284C7),
        elevation: 4,
        shape: const CircleBorder(),
        child: const Icon(Icons.fingerprint, size: 36, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              icon: Icon(Icons.home, color: _currentIndex == 0 ? const Color(0xFF0284C7) : Colors.grey),
              onPressed: () => setState(() => _currentIndex = 0),
            ),
            const SizedBox(width: 40), // Space for FAB
            IconButton(
              icon: Icon(Icons.person, color: _currentIndex == 2 ? const Color(0xFF0284C7) : Colors.grey),
              onPressed: () => setState(() => _currentIndex = 2),
            ),
          ],
        ),
      ),
    );
  }
}

class HomeTab extends StatelessWidget {
  const HomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Halo, Syafiq!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  Text('Software Engineer', style: TextStyle(color: Colors.grey)),
                ],
              ),
              const CircleAvatar(
                radius: 25,
                backgroundImage: NetworkImage('https://ui-avatars.com/api/?name=Syafiq&background=0D8ABC&color=fff'),
              )
            ],
          ),
          const SizedBox(height: 20),
          // Banner
          Container(
            height: 140,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              gradient: const LinearGradient(colors: [Color(0xFF0284C7), Color(0xFF38BDF8)]),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Text('Tetap Semangat Bekerja!', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Jangan lupa absen hari ini sebelum jam 08:00.', style: TextStyle(color: Colors.white70)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text('Pengumuman HRD', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          // Card Pengumuman
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(color: Colors.blue.withOpacity(0.1), shape: BoxShape.circle),
                child: const Icon(Icons.campaign, color: Colors.blue),
              ),
              title: const Text('Libur Nasional'),
              subtitle: const Text('Jumat ini kantor libur memperingati hari besar.'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 14),
            ),
          ),
        ],
      ),
    );
  }
}
