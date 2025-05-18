// lib/navigation.ts
export class NavigationCommands {
  static goToProfile(router: any) {
    router.push("/dashboard");
  }

  static goToLogin(router: any, type: "patient" | "doctor") {
    router.push(`/login/${type}`);
  }
}
