CC=gcc
CFLAGS=-I$(INCLUDE_DIR) -DDEBUG=1
LIBS=-lm
EXE=prog.exe

INCLUDE_DIR=./include
OBJ_DIR=./obj

_DEPS = myFileUtils.h myStrUtils.h
DEPS = $(patsubst %,$(INCLUDE_DIR)/%,$(_DEPS))

_OBJ = main.o myFileUtils.o myStrUtils.o
OBJ = $(patsubst %,$(OBJ_DIR)/%,$(_OBJ))

all: $(EXE)

$(OBJ_DIR)/%.o: %.c $(DEPS)
	mkdir -p $(OBJ_DIR)
	$(CC) -c -o $@ $< $(CFLAGS)

$(EXE): $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

clean:
	rm -f $(OBJ) $(EXE) core
	rm -fr $(OBJ_DIR)
