import subprocess
import json
import sys
import os

def run_command_and_store_json(command, output_file):
    try:
        result = subprocess.run(
            command, shell=True, capture_output=True, text=True, check=True, encoding='utf-8'
        )
        if result.stdout is None:
            print("No output received from the command.", file=sys.stderr)
            return

        output = result.stdout.strip()

        print(output)

        data = json.loads(output)

        with open(output_file, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"JSON output saved to {output_file}")

    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {e}", file=sys.stderr)
    except json.JSONDecodeError:
        print("Command did not return valid JSON.", file=sys.stderr)


if __name__ == "__main__":
    os.remove("Move.lock") 
    run_command_and_store_json("sui client publish --json", "output.json")
