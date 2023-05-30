#include <stdio.h>
// #include <cups/cups.h>

void print_file(const char* file_path, const int color_mode) {
    printf("File printing request received, C code is being executed here\n Color option selected is %d",color_mode);
}
// void cups(const char* file_path, const int color_mode){
//     cups_option_t* options = NULL;
//     // Set color or black and white mode
//     if (color_mode) {
//         options = cupsAddOption(NULL, "cmyk", "auto");
//     } else {
//         options = cupsAddOption(NULL, "cmyk", "off");
//     }
//     // Print the file with options
//     cupsPrintFile2("printer_name", file_path, "Print Job", 1, &options);
//     // Free the options
//     cupsFreeOptions(1, options);
// }