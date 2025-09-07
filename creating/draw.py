import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# ایجاد شکل
fig, ax = plt.subplots(figsize=(8, 6))

# رنگ‌ها
colors = ["#cce5ff", "#b3ffd9", "#ffe0b3", "#ffcccc"]

# لایه‌ها
layers = [
    ("Front-end\n(Next.js + TypeScript)", 0.8, colors[0]),
    ("Back-end\n(Strapi + JavaScript)", 0.6, colors[1]),
    ("پایگاه داده\n(MySQL در Docker)", 0.4, colors[2]),
    ("سرویس جانبی\n(Python Mail Service)", 0.2, colors[3])
]

# رسم مستطیل‌ها
for layer, y, color in layers:
    ax.add_patch(Rectangle((0.2, y), 0.6, 0.12, facecolor=color, edgecolor="black"))
    ax.text(0.5, y + 0.06, layer, ha="center", va="center", fontsize=11, weight="bold")

# تنظیمات
ax.set_xlim(0, 1)
ax.set_ylim(0, 1.1)
ax.axis("off")

plt.title("نمودار معماری لایه‌ای سامانه نوبت‌دهی آنلاین پزشکی", fontsize=13, weight="bold")
plt.savefig("architecture_layered.png", dpi=300, bbox_inches="tight")
plt.show()
