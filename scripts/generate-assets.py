import os
import time
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/consola.ttf"
FONT_BOLD_PATH = "C:/Windows/Fonts/consolab.ttf"
if not os.path.exists(FONT_BOLD_PATH):
    FONT_BOLD_PATH = FONT_PATH

def create_terminal_frame(lines, title="terminal - bash"):
    width, height = 820, 520
    img = Image.new("RGB", (width, height), (13, 17, 23)) # GitHub dark background
    draw = ImageDraw.Draw(img)

    # Title bar
    draw.rectangle([0, 0, width, 36], fill=(22, 27, 34))
    draw.line([0, 36, width, 36], fill=(48, 54, 61), width=1)
    
    # Window controls (macOS style dots)
    draw.ellipse([14, 12, 26, 24], fill=(255, 95, 86))
    draw.ellipse([34, 12, 46, 24], fill=(255, 189, 46))
    draw.ellipse([54, 12, 66, 24], fill=(39, 201, 63))

    title_font = ImageFont.truetype(FONT_PATH, 13)
    draw.text((width // 2 - 50, 10), title, fill=(139, 148, 158), font=title_font)

    # Body lines
    code_font = ImageFont.truetype(FONT_PATH, 13)
    y = 48
    line_height = 18

    for line, color in lines:
        if y + line_height > height - 10:
            break
        draw.text((16, y), line, fill=color, font=code_font)
        y += line_height

    return img

def generate_demo_gif():
    # Sequence of screens:
    # 1. Type audit command
    # 2. Broken output
    # 3. Type fix command
    # 4. Fix output
    # 5. Type audit command again
    # 6. Clean 100/100 output

    C_WHITE = (230, 237, 243)
    C_GRAY = (139, 148, 158)
    C_GREEN = (63, 185, 80)
    C_RED = (248, 81, 73)
    C_YELLOW = (210, 153, 34)
    C_CYAN = (88, 166, 255)

    frames = []
    durations = []

    # Frame 1: Command typed
    f1_lines = [
        ("$ node bin/cli.js audit --dir ./my-app", C_WHITE),
        ("", C_WHITE),
        ("Analyzing AST and store manifests...", C_GRAY)
    ]
    img1 = create_terminal_frame(f1_lines)
    frames.append(img1)
    durations.append(1200)

    # Frame 2: Broken audit output
    f2_lines = [
        ("$ node bin/cli.js audit --dir ./my-app", C_WHITE),
        ("", C_WHITE),
        ("APP LAUNCH SCORE: 60/100 [████████████░░░░░░░░]", C_YELLOW),
        ("Verdict: FATAL REJECTION (Store Rejection Risk)", C_RED),
        ("21 verified · 0 unknown · 2 manual", C_GRAY),
        ("6 BLOCKERS   5 WARNINGS   10 PASSED", C_RED),
        ("", C_WHITE),
        ("APPLE APP STORE", C_CYAN),
        ("  ✗ Reviewer demo account (SMS OTP detected without reviewer bypass)", C_RED),
        ("  ✗ Account deletion (No in-app deletion flow found - Guideline 5.1.1v)", C_RED),
        ("  ✗ Subscription disclosure (Paywall missing Restore Purchases button)", C_RED),
        ("  ✗ Xcode 26 / iOS 26 SDK (Builds with deprecated toolchains)", C_RED),
        ("", C_WHITE),
        ("GOOGLE PLAY STORE", C_CYAN),
        ("  ✗ Target SDK 36+ (Google Play requires target SDK 36+)", C_RED),
        ("  ✗ 16 KB page alignment (React Native lacks 16 KB ELF alignment)", C_RED),
        ("", C_WHITE),
        ("To safely fix issues: node bin/cli.js fix --write", C_YELLOW)
    ]
    img2 = create_terminal_frame(f2_lines)
    frames.append(img2)
    durations.append(3000)

    # Frame 3: Run fix
    f3_lines = [
        ("$ node bin/cli.js fix --dir ./my-app --write --yes", C_WHITE),
        ("", C_WHITE),
        ("Safe Auto-Fix Pipeline:", C_CYAN),
        ("  [✓] Verified git status: clean working tree", C_GREEN),
        ("  [✓] Updated targetSdkVersion: 36 (Android 16)", C_GREEN),
        ("  [✓] Generated PrivacyInfo.xcprivacy (tailored to dependencies)", C_GREEN),
        ("  [✓] Scaffolding useHaptic.ts for tactile detents", C_GREEN),
        ("  [✓] Configured reviewer demo credentials in app.config.js", C_GREEN),
        ("", C_WHITE),
        ("All changes written safely to disk.", C_GREEN)
    ]
    img3 = create_terminal_frame(f3_lines)
    frames.append(img3)
    durations.append(2500)

    # Frame 4: Run audit again
    f4_lines = [
        ("$ node bin/cli.js audit --dir ./my-app", C_WHITE),
        ("", C_WHITE),
        ("APP LAUNCH SCORE: 100/100 [████████████████████]", C_GREEN),
        ("Verdict: SURVIVES LAUNCH (Ready for App Store & Google Play)", C_GREEN),
        ("20 verified · 0 unknown · 3 manual", C_GRAY),
        ("0 BLOCKERS   0 WARNINGS   20 PASSED", C_GREEN),
        ("", C_WHITE),
        ("APPLE APP STORE", C_CYAN),
        ("  ✓ Reviewer demo account (Mock bypass configured)", C_GREEN),
        ("  ✓ Privacy manifest (PrivacyInfo.xcprivacy valid)", C_GREEN),
        ("  ✓ Account deletion (In-app flow verified)", C_GREEN),
        ("  ✓ Subscription disclosure (Restore Purchases verified)", C_GREEN),
        ("", C_WHITE),
        ("GOOGLE PLAY STORE", C_CYAN),
        ("  ✓ Target SDK 36+ (Android 16 compliant)", C_GREEN),
        ("  ✓ 16 KB page alignment verified", C_GREEN),
        ("", C_WHITE),
        ("✨ 100% Launch Ready!", C_GREEN)
    ]
    img4 = create_terminal_frame(f4_lines)
    frames.append(img4)
    durations.append(3500)

    # Save animated GIF
    out_path = "assets/demo.gif"
    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True
    )
    print(f"Saved {out_path}")

def generate_social_preview():
    # 1280x640 GitHub Social Card
    width, height = 1280, 640
    img = Image.new("RGB", (width, height), (13, 17, 23))
    draw = ImageDraw.Draw(img)

    # Subtle border & gradient accents
    draw.rectangle([20, 20, width - 20, height - 20], outline=(48, 54, 61), width=2)
    draw.line([20, 20, width - 20, 20], fill=(88, 166, 255), width=4)

    # Header / Title
    title_font = ImageFont.truetype(FONT_BOLD_PATH, 54)
    subtitle_font = ImageFont.truetype(FONT_PATH, 24)
    tag_font = ImageFont.truetype(FONT_PATH, 18)
    card_font = ImageFont.truetype(FONT_PATH, 16)

    draw.text((70, 70), "App Launch OS", fill=(240, 246, 252), font=title_font)
    draw.text((70, 145), "Store compliance linter & checklists for Expo and React Native", fill=(139, 148, 158), font=subtitle_font)

    # Chips
    chips = [
        "Apple Guideline 2.1 & 5.1.1",
        "Google Target SDK 36",
        "16 KB Page Alignment",
        "StoreKit 2 Paywall",
        "AST Code Linting"
    ]
    x = 70
    y = 205
    for chip in chips:
        chip_w = len(chip) * 11 + 20
        draw.rounded_rectangle([x, y, x + chip_w, y + 36], radius=6, fill=(22, 27, 34), outline=(48, 54, 61))
        draw.text((x + 10, y + 8), chip, fill=(88, 166, 255), font=tag_font)
        x += chip_w + 14

    # Terminal card representation in bottom half
    card_top = 270
    draw.rounded_rectangle([70, card_top, width - 70, height - 70], radius=8, fill=(22, 27, 34), outline=(48, 54, 61))

    card_lines = [
        "$ node bin/cli.js audit --dir ./my-mobile-app",
        "",
        "APP LAUNCH SCORE: 100/100  [████████████████████]  SURVIVES LAUNCH",
        "Store Compliance: 100  |  Security: 100  |  Performance: 100  |  UX & Design: 100",
        "",
        "✓ Reviewer demo account (No SMS OTP)    ✓ Target SDK 36 (Android 16)",
        "✓ Privacy manifest (PrivacyInfo)         ✓ In-app account deletion flow",
        "✓ StoreKit 2 restore button              ✓ 5-state tactile haptic detents"
    ]

    cy = card_top + 25
    for line in card_lines:
        color = (88, 166, 255) if line.startswith("$") else (63, 185, 80) if "✓" in line or "100/100" in line else (201, 209, 217)
        draw.text((95, cy), line, fill=color, font=card_font)
        cy += 28

    out_path = "assets/social-preview.png"
    img.save(out_path, optimize=True)
    print(f"Saved {out_path}")

if __name__ == "__main__":
    generate_demo_gif()
    generate_social_preview()
