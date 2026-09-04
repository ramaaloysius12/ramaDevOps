import 'package:flutter/material.dart';

class HrdCvScreening extends StatelessWidget {
  const HrdCvScreening({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI CV Screening')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0284C7).withOpacity(0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF0284C7), style: BorderStyle.solid, width: 2),
              ),
              child: Column(
                children: [
                  const Icon(Icons.picture_as_pdf, size: 60, color: Color(0xFF0284C7)),
                  const SizedBox(height: 16),
                  const Text('Upload CV Kandidat (PDF)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  const Text('AI akan menganalisis kecocokan CV dengan kualifikasi perusahaan secara otomatis.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey)),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text('Pilih File PDF'),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
