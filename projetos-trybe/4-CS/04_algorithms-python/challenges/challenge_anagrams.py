def is_anagram(first_string, second_string):
    if (len(first_string) != len(second_string)):
        return False

    second_string_array = list(second_string.lower())
    for letter in first_string.lower():
        try:
            second_string_array.remove(letter)
        except ValueError:
            return False

    return True
