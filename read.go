package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
)

var max [11]int
var answer = 0

func main() {
	var reader *bufio.Reader = bufio.NewReader(os.Stdin)
	var writer *bufio.Writer = bufio.NewWriter(os.Stdout)

	defer writer.Flush()
	var n int
	fmt.Fscan(reader, &n)

	var board [20][20]int
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			fmt.Fscan(reader, &board[i][j])
		}
	}
	answer = getMax(board)
	run(board, 0)
	fmt.Println((answer))
}

func rotate(board [20][20]int) [20][20]int {
	var temp [20][20]int

	for i := 0; i < 20; i++ {
		for j := 0; j < 20; j++ {
			temp[i][j] = board[20-1-j][i]
		}
	}

	return temp
}

func getMax(board [20][20]int) int {
	var temp = 0
	for i := 0; i < 20; i++ {
		for j := 0; j < 20; j++ {
			if temp < board[i][j] {
				temp = board[i][j]
			}
		}
	}
	return temp
}

func isSame(board [20][20]int, new_board [20][20]int) bool {

	for i := 0; i < 20; i++ {
		for j := 0; j < 20; j++ {
			if board[i][j] != new_board[i][j] {
				return false
			}
		}
	}
	return true
}

func left(board [20][20]int) [20][20]int {
	temp := board

	for i := 0; i < 20; i++ {
		for j := 1; j < 20; j++ {

			if temp[i][j-1] == temp[i][j] {
				temp[i][j-1] <<= 1
				temp[i][j] = 0
			}

			if temp[i][j] == 0 {
				if j < 19 {
					temp[i][j] = temp[i][j+1]
					temp[i][j+1] = 0
				} else {
					break
				}
			}

			if temp[i][j-1] == temp[i][j] {
				temp[i][j-1] <<= 1
				temp[i][j] = 0
			}

		}
	}

	return temp

}

func right(board [20][20]int) [20][20]int {
	temp := board

	for i := 0; i < 20; i++ {
		for j := 18; j >= 0; j-- {

			if temp[i][j+1] == temp[i][j] {
				temp[i][j+1] <<= 1
				temp[i][j] = 0
			}

			if temp[i][j] == 0 {
				if j > 0 {
					temp[i][j] = temp[i][j-1]
					temp[i][j-1] = 0
				} else {
					break
				}
			}

			if temp[i][j+1] == temp[i][j] {
				temp[i][j+1] <<= 1
				temp[i][j] = 0
			}

		}
	}

	return temp

}
func up(board [20][20]int) [20][20]int {
	temp := board

	for i := 0; i < 20; i++ {
		for j := 1; j < 20; j++ {

			if temp[j-1][i] == temp[j][i] {
				temp[j-1][i] <<= 1
				temp[j][i] = 0
			}

			if temp[j][i] == 0 {
				if j < 19 {
					temp[j][i] = temp[j+1][i]
					temp[j+1][i] = 0
				} else {
					break
				}
			}

			if temp[j-1][i] == temp[j][i] {
				temp[j-1][i] <<= 1
				temp[j][i] = 0
			}

		}
	}

	return temp

}
func down(board [20][20]int) [20][20]int {
	temp := board

	for i := 0; i < 20; i++ {
		for j := 18; j >= 0; j-- {

			if temp[j+1][i] == temp[j][i] {
				temp[j+1][i] <<= 1
				temp[j][i] = 0
			}

			if temp[j][i] == 0 {
				if j > 0 {
					temp[j][i] = temp[j-1][i]
					temp[j-1][i] = 0
				} else {
					break
				}
			}

			if temp[j+1][i] == temp[j][i] {
				temp[j+1][i] <<= 1
				temp[j][i] = 0
			}

		}
	}

	return temp

}

func run(board [20][20]int, cnt int) {

	now_max := getMax(board)
	if now_max < max[cnt] {
		return
	}

	if cnt == 10 {
		answer = int(math.Max(float64(answer), float64(now_max)))
		temp_max := answer

		for k := cnt; k > 0; k-- {
			max[k] = temp_max
			temp_max >>= 1
		}

		return
	}

	for i := 0; i < 4; i++ {
		var temp [20][20]int

		switch i {
		case 0:
			temp = left(board)
			break
		case 1:
			temp = right(board)
			break
		case 2:
			temp = up(board)
			break
		case 3:
			temp = down(board)
			break
		}

		if !isSame(board, temp) {
			run(temp, cnt+1)
		}

	}

}
