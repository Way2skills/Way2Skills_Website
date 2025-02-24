from PIL import Image, ImageDraw, ImageFont
import qrcode
import uuid

def create_membership_card(name, email, member_id=None, bg_image_path="Exclusive.png"):
    # Generate a unique 8-character membership ID if not provided
    if member_id is None:
        member_id = uuid.uuid4().hex[:8].upper()  # e.g., "A1B2C3D4"

    # Load and resize the background image
    bg_logo = Image.open(bg_image_path).convert("RGBA")
    width, height = 800, 400
    bg_logo = bg_logo.resize((width, height))

    # Create a new image from the background
    card = bg_logo.copy()
    draw = ImageDraw.Draw(card)

    # Load fonts (ensure these font files are accessible)
    try:
        zilla_slab_font = ImageFont.truetype("ZillaSlab-Bold.ttf", 50)      # For "Exclusive"
        montserrat_font = ImageFont.truetype("Montserrat-Bold.ttf", 75)       # For "MEMBERSHIP"
        tag_font = ImageFont.truetype("arialbd.ttf", 30)                      # Bold font for tags
        text_font = ImageFont.truetype("arial.ttf", 25)
    except:
        zilla_slab_font = montserrat_font = tag_font = text_font = ImageFont.load_default()

    # Define title texts
    exclusive_text = "Exclusive"
    membership_text = "MEMBERSHIP"

    # Calculate text widths for centering
    exclusive_width = draw.textbbox((0, 0), exclusive_text, font=zilla_slab_font)[2]
    membership_width = draw.textbbox((0, 0), membership_text, font=montserrat_font)[2]

    center_x_exclusive = (width - exclusive_width) // 2
    center_x_membership = (width - membership_width) // 2

    # Draw centered title with reduced top padding
    draw.text((center_x_exclusive, 10), exclusive_text, fill="red", font=zilla_slab_font)
    draw.text((center_x_membership, 50), membership_text, fill="blue", font=montserrat_font)

    # Add member details with bold tags
    draw.text((60, 180), "Name:", fill="black", font=tag_font)
    draw.text((170, 180), name, fill="black", font=text_font)

    draw.text((60, 220), "Email:", fill="black", font=tag_font)
    draw.text((170, 220), email, fill="black", font=text_font)

    draw.text((60, 260), "ID:", fill="black", font=tag_font)
    draw.text((170, 260), member_id, fill="black", font=text_font)

    # Generate a QR Code containing the member details
    qr_data = f"Name: {name}\nEmail: {email}\nID: {member_id}"
    qr = qrcode.QRCode(box_size=5, border=2)
    qr.add_data(qr_data)
    qr.make(fit=True)
    qr_img = qr.make_image(fill="black", back_color="white").convert("RGBA")

    # Create a rounded QR code effect
    qr_size = 160
    rounded_qr = Image.new("RGBA", (qr_size, qr_size), (0, 0, 0, 0))
    qr_img = qr_img.resize((qr_size, qr_size))
    mask = Image.new("L", (qr_size, qr_size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle((0, 0, qr_size, qr_size), radius=30, fill=255)
    rounded_qr.paste(qr_img, (0, 0), mask)

    # Paste the QR code onto the card
    card.paste(rounded_qr, (600, 140), rounded_qr)

    # Save and display the membership card
    card.save("final_membership_card.png")
    card.show()

if __name__ == "__main__":
    name = input("Enter member name: ")
    email = input("Enter member email: ")
    create_membership_card(name, email)
