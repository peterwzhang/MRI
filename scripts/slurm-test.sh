#!/bin/bash
#SBATCH -J ncovercash_test # job name\n
#SBATCH -n 2 # number of tasks to use (usually 1)\n
#SBATCH -c 1 # number of threads you are going to use\n
#SBATCH -p main\n
#SBATCH --qos debug # queue, 15min limit\n
#SBATCH -e %A.errors # send errors to ID.errors\n
#SBATCH -o %A.output # send output to ID.output\n
#SBATCH --mail-user=ncovercash@crimson.ua.edu\n

# Takes about 6 minutes to complete

for i in {0..100000}
do
  for j in {0..10000}; do true; done
  echo $i
done
