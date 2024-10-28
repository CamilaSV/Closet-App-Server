import argparse
from rembg import remove

def main(input_path, output_path):
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()

    output_data = remove(input_data)

    with open(output_path, 'wb') as output_file:
        output_file.write(output_data)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Remove background from an image.")
    parser.add_argument("input_path", help="Path to the input image file.")
    parser.add_argument("output_path", help="Path to save the output image file.")

    args = parser.parse_args()
    main(args.input_path, args.output_path)
