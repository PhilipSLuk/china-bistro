#include <stdio.h>
#include <stdlib.h>

/* file open with some error checking */
FILE * myFileOpen(char* fileName, char* mode);

/* file close with some error checking */
int myFileClose(FILE* fileHandle);

/* get next line from given file */
int myFileGetLine(FILE* fileHandle, char* buffer);

/* print contents of given file */
int myPrintFileContents(char* fileName);
