/******************************************************************
 *
 * Copyright (C) 2017 Philip Luk - All Rights Reserved
 *
 * Given two strings, write a program that efficiently finds the
 * longest common subsequence.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 *
 ******************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include "myFileUtils.h"
#include "myStrUtils.h"

int main(int argc, char *argv[]) {

   if (argc < 2) {
     /* no arguments given */
     fprintf(stderr, "ERROR: %s <data input file>\n", argv[0]);
     exit(1);
   }

  FILE *fileHandle = NULL;
  char *fileName = argv[1];
  assert (fileName);

  #ifdef DEBUG
    printf ("DEBUG: reading file \"%s\"..\n", fileName);
  #endif

  fileHandle = myFileOpen(fileName, "r");
  assert(fileHandle);

  char buff[1000]; /* ToDO: need to do something smarter here */
  char* tok1, *tok2;

  while (myFileGetLine(fileHandle, buff) != 0) {
    #ifdef DEBUG
      printf ("DEBUG: --- READ: %s\n", buff);
    #endif
    tok1 = strtok(buff, ":");
    tok2 = strtok(NULL, ":");

    #ifdef DEBUG
      printf ("DEBUG: --- STR1: %s\n", tok1);
      printf ("DEBUG: --- STR2: %s\n", tok2);
    #endif

    char* substr = findLongestCommonSubString (tok1, tok2);
    #ifdef DEBUG
      printf ("DEBUG: ------> %s\n", substr);
    #endif
  }

  myFileClose(fileHandle);
}
