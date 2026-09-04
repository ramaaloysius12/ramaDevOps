import 'package:flutter/material.dart';

class LeaveRequestScreen extends StatelessWidget {
  const LeaveRequestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pengajuan Cuti & Izin')),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  DropdownButtonFormField<String>(
                    decoration: const InputDecoration(labelText: 'Tipe Izin'),
                    items: ['Sakit', 'Cuti Tahunan', 'Keperluan Mendadak']
                        .map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
                    onChanged: (val) {},
                  ),
                  const SizedBox(height: 16),
                  const TextField(
                    maxLines: 3,
                    decoration: InputDecoration(labelText: 'Alasan / Keterangan'),
                  ),
                  const SizedBox(height: 16),
                  OutlinedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.upload_file),
                    label: const Text('Upload Surat Dokter / Bukti (PDF/JPG)'),
                    style: OutlinedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 50)),
                    child: const Text('Kirim Pengajuan'),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
