import 'package:flutter/material.dart';

class HrdAddEmployee extends StatelessWidget {
  const HrdAddEmployee({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tambah Karyawan Baru')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                const TextField(decoration: InputDecoration(labelText: 'NIK Karyawan')),
                const SizedBox(height: 16),
                const TextField(decoration: InputDecoration(labelText: 'Nama Lengkap')),
                const SizedBox(height: 16),
                const TextField(decoration: InputDecoration(labelText: 'Email Karyawan')),
                const SizedBox(height: 16),
                const TextField(obscureText: true, decoration: InputDecoration(labelText: 'Password Akun')),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Karyawan Berhasil Ditambahkan')));
                    Navigator.pop(context);
                  },
                  style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
                  child: const Text('Simpan Data'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
