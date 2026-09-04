import 'package:flutter/material.dart';
import '../modules/auth/login_screen.dart';
import '../modules/employee/employee_dashboard.dart';
import '../modules/hrd/hrd_dashboard.dart';
import '../modules/employee/face_attendance_screen.dart';

class AppRouter {
  static const String splash = '/';
  static const String login = '/login';
  static const String employeeDashboard = '/employee-dashboard';
  static const String hrdDashboard = '/hrd-dashboard';
  static const String faceAttendance = '/face-attendance';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
      case login:
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case employeeDashboard:
        return MaterialPageRoute(builder: (_) => const EmployeeDashboard());
      case hrdDashboard:
        return MaterialPageRoute(builder: (_) => const HrdDashboard());
      case faceAttendance:
        return MaterialPageRoute(builder: (_) => const FaceAttendanceScreen());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(child: Text('Halaman ${settings.name} tidak ditemukan')),
          ),
        );
    }
  }
}
