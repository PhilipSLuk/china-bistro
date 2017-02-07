#include <assert.h>
#include <string.h>
#include "myFileUtils.h"

FILE * myFileOpen(char* fileName, char* mode) {
  FILE* fileHandle;

  assert(fileName);
  assert(mode);
  fileHandle = fopen(fileName, mode);

  if (!fileHandle) {
    /* file does not exist */
    fprintf(stderr, "ERROR: unable to open \"%s\"\n", fileName);
    exit(1);
  }

  return fileHandle;
}

int myFileClose(FILE* fileHandle) {
  int rc = 0;

  rc = fclose(fileHandle);
  if (rc != 0) {
    fprintf(stderr, "ERROR: unable to close file\n");
    exit(1);
  }

  return rc;
}

int myFileGetLine(FILE* fileHandle, char* buffer) {
  unsigned int buffLen = 0;
  assert(fileHandle);
  assert(buffer);

  /* ToDo: need to do some buffer overflow protection here */
  // buffLen = sizeof(*buffer);
  // #ifdef DEBUG
  //    printf ("DEBUG: passed buffer len of \"%d\"..\n", buffLen);
  // #endif

  unsigned int count = 0;
  char ch;

  do {
    ch = fgetc(fileHandle);
    if (ch != EOF && ch != '\n') {
      //ToDO: if (count < buffLen) {
      buffer[count] = ch;
      //}
      count++;
    }
  } while(ch != EOF && ch !='\n');
  buffer[count] = '\0';
  
  return count;
}

int myPrintFileContents(char* fileName) {
  FILE *fileHandle = NULL;
  char ch;
  int rc = 0;

  if (!fileName) {
    fprintf(stderr, "ERROR: no fileName provided..\n");
    rc = -1;
  }
  else {
    #ifdef DEBUG
       printf ("DEBUG: reading file \"%s\"..\n", fileName);
    #endif

    fileHandle = myFileOpen(fileName, "r");
    assert(fileHandle);

    char buff[1000]; /* ToDO: need to do something smarter here */

    while (myFileGetLine(fileHandle, buff) != 0) {
      printf ("READ: %s\n", buff);
    }

    myFileClose(fileHandle);
  }

  return rc;
}
