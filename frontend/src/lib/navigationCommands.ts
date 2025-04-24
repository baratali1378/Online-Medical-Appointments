// lib/navigation.ts
export class NavigationCommands {
  static goToProfile(router: any) {
    router.push("/profile");
  }

  static goToLogin(router: any, type: "patient" | "doctor") {
    router.push(`/${type}-login`);
  }
}
