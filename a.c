#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>

#define OUTPUT_FILE "merged_output.txt"
#define MAX_PATH 260

void mergeFilesInDirectory(const char *folderPath) {
    DIR *dir;
    struct dirent *entry;
    FILE *outFile, *inFile;
    char filePath[MAX_PATH];
    char buffer[1024];
    
    dir = opendir(folderPath);
    if (dir == NULL) {
        perror("Could not open directory");
        return;
    }
    
    outFile = fopen(OUTPUT_FILE, "w");
    if (outFile == NULL) {
        perror("Could not open output file");
        closedir(dir);
        return;
    }
    
    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_type == DT_REG) { // Regular file
            snprintf(filePath, MAX_PATH, "%s/%s", folderPath, entry->d_name);
            inFile = fopen(filePath, "r");
            if (inFile == NULL) {
                perror("Could not open input file");
                continue;
            }
            
            fprintf(outFile, "\n--- Content of file: %s ---\n", entry->d_name);
            while (fgets(buffer, sizeof(buffer), inFile)) {
                fputs(buffer, outFile);
            }
            
            fclose(inFile);
        }
    }
    
    fclose(outFile);
    closedir(dir);
    printf("Merged content into %s\n", OUTPUT_FILE);
}

int main() {
    char folderPath[MAX_PATH];
    
    printf("Enter the folder path: ");
    scanf("%s", folderPath);
    
    mergeFilesInDirectory(folderPath);
    
    return 0;
}
