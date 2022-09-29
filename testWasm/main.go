package main

import (
	"math"
	"syscall/js"
)

func _sum1(n int) int {
	s := 0
	for i := 0; i < n; i++ {
		s += 1
	}
	return s
}

func _sum2(n int, workerNum int) int {
	numsForOneWorker := int(math.Floor(float64(n) / float64(workerNum)))
	remainder := n - workerNum*numsForOneWorker

	sumChannel := make(chan int)

	for i := 0; i < workerNum; i++ {
		go func(i int) {
			_n := numsForOneWorker
			if i == workerNum-1 {
				_n += remainder
			}
			s := 0
			for j := 0; j < _n; j++ {
				s += 1
			}
			sumChannel <- s
		}(i)
	}

	s := 0
	for i := 0; i < workerNum; i++ {
		s += <-sumChannel
	}

	return s
}

func main() {
	// s := time.Now()
	// fmt.Println(sum(10000000000))
	// fmt.Println(sum2(10000000000, 8))
	// fmt.Println(time.Since(s))

	c := make(chan struct{}, 0)
	js.Global().Set("sum1", js.FuncOf(sum1))
	js.Global().Set("sum2", js.FuncOf(sum2))
	<-c
}

func sum1(this js.Value, args []js.Value) any {
	return _sum1(args[0].Int())
}

func sum2(this js.Value, args []js.Value) any {
	return _sum2(args[0].Int(), 6)
}
