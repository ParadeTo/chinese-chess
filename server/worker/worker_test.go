package worker

import (
	. "github.com/smartystreets/goconvey/convey"
	"math"
	"testing"
)

type MaxWorker struct {
	subArr        []int
	resultChannel chan int
}

func (mw MaxWorker) Task() {
	max := -1
	for i := 0; i < len(mw.subArr); i++ {
		if mw.subArr[i] > max {
			max = mw.subArr[i]
		}
	}
	mw.resultChannel <- max
}

func TestWorker(t *testing.T) {
	arr := []int{8, 2, 5, 4, 3, 6, 7, 1, 9}
	workerNum := 4
	resultChannel := make(chan int)
	len := len(arr)
	n := int(math.Floor(float64(len) / float64(workerNum)))
	remainder := len - workerNum*n

	p := New(workerNum)
	lastEnd := 0
	for i := 0; i < workerNum; i++ {
		if n*i > len-1 {
			break
		}
		start := lastEnd
		offset := n
		if remainder > 0 {
			offset += 1
		}
		remainder--
		subArr := arr[start : start+offset]
		lastEnd = start + offset
		p.Run(MaxWorker{subArr: subArr, resultChannel: resultChannel})
	}

	max := -1
	for i := 0; i < workerNum; i++ {
		subMax := <-resultChannel
		if subMax > max {
			max = subMax
		}
	}
	p.Shutdown()
	Convey("TestWorker", t, func() {
		So(max, ShouldEqual, 9)
	})
}
