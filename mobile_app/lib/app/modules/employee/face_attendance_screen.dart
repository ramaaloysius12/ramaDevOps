import 'package:flutter/material.dart';

class FaceAttendanceScreen extends StatelessWidget {
  const FaceAttendanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Absensi Wajah')),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('Posisikan wajah Anda di dalam area', style: TextStyle(fontSize: 16)),
          const SizedBox(height: 20),
          Center(
            child: Container(
              width: 250,
              height: 350,
              decoration: BoxDecoration(
                border: Border.all(color: const Color(0xFF0284C7), width: 3),
                borderRadius: BorderRadius.circular(20),
                color: Colors.grey[300],
              ),
              child: const Center(
                child: Icon(Icons.face, size: 100, color: Colors.grey), // Placeholder Camera
              ),
            ),
          ),
          const SizedBox(height: 40),
          ElevatedButton.icon(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Absen Berhasil!')));
              Navigator.pop(context);
            },
            icon: const Icon(Icons.camera_alt),
            label: const Text('Ambil Foto & Absen'),
            style: ElevatedButton.styleFrom(minimumSize: const Size(200, 50)),
          )
        ],
      ),
    );
  }
}
