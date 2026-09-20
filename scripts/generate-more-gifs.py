import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/consola.ttf"
FONT_BOLD_PATH = "C:/Windows/Fonts/consolab.ttf"
if not os.path.exists(FONT_BOLD_PATH):
    FONT_BOLD_PATH = FONT_PATH

def create_terminal_frame(lines, width=820, height=480, title="terminal - bash"):
    img = Image.new("RGB", (width, height), (13, 17, 23)) # GitHub Dark
    draw = ImageDraw.Draw(img)

    # Title bar
    draw.rectangle([0, 0, width, 36], fill=(22, 27, 34))
    draw.line([0, 36, width, 36], fill=(48, 54, 61), width=1)
    
    # macOS window buttons
    draw.ellipse([14, 12, 26, 24], fill=(255, 95, 86))
    draw.ellipse([34, 12, 46, 24], fill=(255, 189, 46))
    draw.ellipse([54, 12, 66, 24], fill=(39, 201, 63))

    title_font = ImageFont.truetype(FONT_PATH, 13)
    draw.text((width // 2 - 50, 10), title, fill=(139, 148, 158), font=title_font)

    # Monospace text lines
    code_font = ImageFont.truetype(FONT_PATH, 13)
    y = 48
    line_height = 19

    for line, color in lines:
        if y + line_height > height - 10:
            break
        draw.text((18, y), line, fill=color, font=code_font)
        y += line_height

    return img

def generate_roast_gif():
    C_WHITE = (230, 237, 243)
    C_GRAY = (139, 148, 158)
    C_RED = (248, 81, 73)
    C_YELLOW = (210, 153, 34)
    C_CYAN = (88, 166, 255)
    C_ORANGE = (255, 166, 87)

    frames = []
    durations = []

    # Frame 1: Command typing
    f1 = [
        ("$ node bin/cli.js roast --dir ./my-app", C_WHITE),
        ("", C_WHITE),
        ("Analyzing repository for store rejection vectors...", C_GRAY)
    ]
    frames.append(create_terminal_frame(f1))
    durations.append(1400)

    # Frame 2: Brutal Roast output
    f2 = [
        ("$ node bin/cli.js roast --dir ./my-app", C_WHITE),
        ("", C_WHITE),
        ("🔥 ROAST MY APP — App Launch OS", C_ORANGE),
        ("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", C_GRAY),
        ("Your app scored: 54/100 [██████████░░░░░░░░░░]", C_YELLOW),
        ("Found 4 fatal store blockers and 5 embarrassing warnings:", C_RED),
        ("", C_WHITE),
        ("🔴 SMS Auth Trap (Apple Guideline 2.1):", C_RED),
        ("   Apple reviewers cannot receive external SMS OTPs.", C_WHITE),
        ("   They will reject your app within 4 minutes while sipping espresso.", C_GRAY),
        ("", C_WHITE),
        ("🔴 Missing PrivacyInfo.xcprivacy (Guideline 5.1.1):", C_RED),
        ("   Automated binary scanners will auto-reject your upload before", C_WHITE),
        ("   a human reviewer even touches it.", C_GRAY),
        ("", C_WHITE),
        ("🟠 Raw ActivityIndicator Spinners Everywhere:", C_YELLOW),
        ("   Blank screens with generic wheels make your app feel like a", C_WHITE),
        ("   2017 PhoneGap web wrapper. Use Moti shimmer skeletons.", C_GRAY),
        ("", C_WHITE),
        ("👉 Fix issues automatically: node bin/cli.js fix --write", C_CYAN)
    ]
    frames.append(create_terminal_frame(f2))
    durations.append(4000)

    out_path = "assets/roast-demo.gif"
    frames[0].save(out_path, save_all=True, append_images=frames[1:], duration=durations, loop=0, optimize=True)
    print(f"Generated {out_path}")

def generate_srm_gif():
    C_WHITE = (230, 237, 243)
    C_GRAY = (139, 148, 158)
    C_GREEN = (63, 185, 80)
    C_RED = (248, 81, 73)
    C_YELLOW = (210, 153, 34)
    C_CYAN = (88, 166, 255)

    frames = []
    durations = []

    # Frame 1: Running experiments validator
    f1 = [
        ("$ node -e \"import('@applaunchos/experiments').then(m => m.checkSRM())\"", C_WHITE),
        ("", C_WHITE),
        ("Evaluating A/B experiment sample distributions...", C_GRAY)
    ]
    frames.append(create_terminal_frame(f1))
    durations.append(1200)

    # Frame 2: SRM Warning detected
    f2 = [
        ("$ node -e \"import('@applaunchos/experiments').then(m => m.checkSRM())\"", C_WHITE),
        ("", C_WHITE),
        ("🧪 A/B TEST HEALTH MONITOR: Sample Ratio Mismatch (SRM)", C_CYAN),
        ("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", C_GRAY),
        ("Experiment: 'checkout_paywall_v2' (Configured: 50% / 50%)", C_WHITE),
        ("  Control:  5,240 visitors (54.1%)", C_WHITE),
        ("  Variant:  4,440 visitors (45.9%)", C_WHITE),
        ("", C_WHITE),
        ("Statistical Calculation (Lanczos Incomplete Gamma):", C_GRAY),
        ("  Chi-Square (χ²): 66.11   df: 1", C_YELLOW),
        ("  p-value:         4.26e-16 (Threshold: p < 0.01)", C_RED),
        ("", C_WHITE),
        ("🚨 CRITICAL ALERT: SAMPLE RATIO MISMATCH DETECTED!", C_RED),
        ("Traffic assignment is mathematically biased.", C_RED),
        ("Reason: Variant crash on cold launch or dropped exposure telemetry.", C_GRAY),
        ("⛔ DO NOT trust conversion metrics until SRM is resolved.", C_YELLOW)
    ]
    frames.append(create_terminal_frame(f2))
    durations.append(3500)

    # Frame 3: Normal Healthy Test
    f3 = [
        ("$ node -e \"import('@applaunchos/experiments').then(m => m.checkSRM())\"", C_WHITE),
        ("", C_WHITE),
        ("🧪 A/B TEST HEALTH MONITOR: Sample Ratio Mismatch (SRM)", C_CYAN),
        ("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", C_GRAY),
        ("Experiment: 'onboarding_pricing' (Configured: 50% / 50%)", C_WHITE),
        ("  Control:  5,012 visitors (50.1%)", C_WHITE),
        ("  Variant:  4,988 visitors (49.9%)", C_WHITE),
        ("", C_WHITE),
        ("Statistical Calculation (Lanczos Incomplete Gamma):", C_GRAY),
        ("  Chi-Square (χ²): 0.057   df: 1", C_GREEN),
        ("  p-value:         0.811 (Healthy: p >= 0.01)", C_GREEN),
        ("", C_WHITE),
        ("✅ VALID EXPERIMENT: 0% sample bias detected. Data is trustworthy.", C_GREEN)
    ]
    frames.append(create_terminal_frame(f3))
    durations.append(3000)

    out_path = "assets/experiments-srm.gif"
    frames[0].save(out_path, save_all=True, append_images=frames[1:], duration=durations, loop=0, optimize=True)
    print(f"Generated {out_path}")

def generate_concentricity_gif():
    # Visual diagram illustrating concentric corners vs identical corners
    width, height = 820, 440
    
    frames = []
    durations = []

    def draw_concentric_canvas(highlight_formula=False, pulse=0):
        img = Image.new("RGB", (width, height), (13, 17, 23))
        draw = ImageDraw.Draw(img)

        # Title
        title_font = ImageFont.truetype(FONT_BOLD_PATH, 20)
        subtitle_font = ImageFont.truetype(FONT_PATH, 13)
        lbl_font = ImageFont.truetype(FONT_BOLD_PATH, 15)
        mono_font = ImageFont.truetype(FONT_PATH, 12)
        formula_font = ImageFont.truetype(FONT_BOLD_PATH, 16)

        draw.text((30, 24), "The Golden Corner Concentricity Law", fill=(240, 246, 252), font=title_font)
        draw.text((30, 52), "Why nested containers collide and how mathematical radii matching eliminates visual distortion", fill=(139, 148, 158), font=subtitle_font)

        # Card 1: Bad (Identical Radii)
        c1_x, c1_y, c1_w, c1_h = 40, 95, 340, 250
        outer_r1 = 28
        padding1 = 18
        # Outer card
        draw.rounded_rectangle([c1_x, c1_y, c1_x + c1_w, c1_y + c1_h], radius=outer_r1, fill=(22, 27, 34), outline=(248, 81, 73), width=2)
        # Inner card with identical radius (BAD)
        inner_r1 = outer_r1
        draw.rounded_rectangle([c1_x + padding1, c1_y + padding1, c1_x + c1_w - padding1, c1_y + c1_h - padding1], radius=inner_r1, fill=(33, 38, 45), outline=(248, 81, 73, 180), width=1)
        
        draw.text((c1_x + 20, c1_y + 25), "❌ Identical Radii (Distorted)", fill=(248, 81, 73), font=lbl_font)
        draw.text((c1_x + 20, c1_y + 55), "R_outer = 28px\nR_inner = 28px  (Identical)\nPadding = 18px", fill=(139, 148, 158), font=mono_font)
        draw.text((c1_x + 20, c1_y + 175), "⚠️ Awkward corner pinch & collision", fill=(248, 81, 73), font=mono_font)
        draw.text((c1_x + 20, c1_y + 195), "Visual thickness varies from 18px to 38px", fill=(139, 148, 158), font=mono_font)

        # Card 2: Good (Concentric Radii)
        c2_x = 440
        outer_r2 = 28
        padding2 = 18
        inner_r2 = outer_r2 - padding2 # 10px
        draw.rounded_rectangle([c2_x, c1_y, c2_x + c1_w, c1_y + c1_h], radius=outer_r2, fill=(22, 27, 34), outline=(63, 185, 80), width=2)
        draw.rounded_rectangle([c2_x + padding2, c1_y + padding2, c2_x + c1_w - padding2, c1_y + c1_h - padding2], radius=inner_r2, fill=(33, 38, 45), outline=(63, 185, 80), width=2)

        draw.text((c2_x + 20, c1_y + 25), "✅ Concentric (Hardware Match)", fill=(63, 185, 80), font=lbl_font)
        draw.text((c2_x + 20, c1_y + 55), "R_outer = 28px\nR_inner = max(0, 28 - 18) = 10px\nPadding = 18px", fill=(139, 148, 158), font=mono_font)
        draw.text((c2_x + 20, c1_y + 175), "✨ Uniform bezel curve at every angle", fill=(63, 185, 80), font=mono_font)
        draw.text((c2_x + 20, c1_y + 195), "Matches iPhone & Android hardware bezel", fill=(139, 148, 158), font=mono_font)

        # Bottom banner with formula
        formula_box_y = 370
        f_bg = (33, 38, 45) if not highlight_formula else (40, 48, 60)
        draw.rounded_rectangle([40, formula_box_y, width - 40, formula_box_y + 45], radius=8, fill=f_bg, outline=(88, 166, 255), width=2 if highlight_formula else 1)
        draw.text((70, formula_box_y + 12), "Formula:  R_inner = Math.max(0, R_outer - padding)", fill=(88, 166, 255), font=formula_font)
        draw.text((580, formula_box_y + 15), "Native in modules/M17-premium-ux", fill=(139, 148, 158), font=mono_font)

        return img

    for i in range(3):
        frames.append(draw_concentric_canvas(highlight_formula=False))
        durations.append(1500)
        frames.append(draw_concentric_canvas(highlight_formula=True))
        durations.append(1500)

    out_path = "assets/concentricity-demo.gif"
    frames[0].save(out_path, save_all=True, append_images=frames[1:], duration=durations, loop=0, optimize=True)
    print(f"Generated {out_path}")

if __name__ == "__main__":
    generate_roast_gif()
    generate_srm_gif()
    generate_concentricity_gif()
