#include <iostream>
#include <string>
#include <ctime>


using namespace std;

void createData(char* filename, int rowCount, int colCount)
{

    int *buffer;
    buffer = (int *)malloc(sizeof(int*) * rowCount * colCount);
    

    for (int i=0; i < rowCount; i++)
    {
        for (int j=0; j < colCount; j++)
        {
            if (j == 0)
                buffer[i * colCount + j] = 5;
            else if (j == 1)
                buffer[i * colCount + j] = rand() % 10000;
            else 
                buffer[i * colCount + j] = rand() % 100000;
        }
        //cout << buffer[i][0] << " " << buffer[i][1] << " " << buffer[i][2] << endl;
    }


    FILE *pFile;    
    size_t result;
    pFile = fopen(filename, "wb");
    if (pFile == NULL)
    {
        cout << "Error!" << endl;
        exit(1);
    }

    if (buffer == NULL)
    {
        fputs("Memory error", stderr);
        exit(2);
    }

    result = fwrite(buffer, sizeof(int), rowCount * colCount, pFile);
    if (result != rowCount * colCount)
    {
        cout << "Writing error " << result << " " << sizeof(int) * rowCount * colCount << endl;
        exit(3);
    }

    fclose(pFile);

    free(buffer);
}

int main(int argc, char *argv[])
{
    srand(time(NULL));
    
    int rowCount = atoi(argv[2]);
    int colCount = atoi(argv[3]);
    char *filename = argv[1];
    
    clock_t start_t = clock();
    createData(filename, rowCount, colCount);
    clock_t end_t = clock();
    float seconds_t = (float)(end_t - start_t) / CLOCKS_PER_SEC;

    cout << "Filename " << filename << " Row count " << rowCount << " Column count " << colCount << endl;
    cout << "Time taken to populate this data " << seconds_t << endl;

    return 0;
}
