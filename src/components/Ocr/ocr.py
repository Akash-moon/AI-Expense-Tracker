import pytesseract
from PIL import Image
import re
from datetime import datetime

# Set the path for the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Update this path based on your installation

def extract_text_from_image(image_path):
    # Open an image file
    with Image.open(image_path) as img:
        # Use Tesseract to do OCR on the image
        text = pytesseract.image_to_string(img)
    return text

def parse_receipt(text):
    # Split text into lines
    lines = text.split('\n')
    
    # Extract the name from the first two lines
    name = lines[0].strip() + ' ' + lines[1].strip()
    
    # Regular expressions to identify the details
    date_pattern = r'(\d{2}/\d{2}/\d{2})'
    subtotal_pattern = r'Sub Total:\s*(\d+\.\d{2})'
    total_pattern = r'(?:Total|TOTAL|Net Total|Grand Total|Total Rs\.?)\s*:\s*(\d+\.\d{2})'

    # Find matches using regular expressions
    date_match = re.search(date_pattern, text)
    subtotal_match = re.search(subtotal_pattern, text)
    total_match = re.search(total_pattern, text)

    date = date_match.group(1) if date_match else None
    total = (total_match.group(1) if total_match else None)
    # total = round(total + 0.09*total*2)
    # Convert date to a standard format
    if date:
        try:
            date = datetime.strptime(date, '%d/%m/%y').strftime('%Y-%m-%d')
        except ValueError:
            pass  # If date parsing fails, keep the original string

    return {
        'name': name,
        'date': date,
        'total': total
    }

# Example usage

image_path = "../server/uploads/image_predict.jpeg"
text = extract_text_from_image(image_path)
receipt_details = parse_receipt(text)
print(receipt_details)