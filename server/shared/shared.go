package shared

const (
	INFINITE = int(^uint(0) >> 1)
)

func Max(a ...int) int {
	m := -INFINITE
	for _, i := range a {
		if i > m {
			m = i
		}
	}
	return m
}

func Min(a ...int) int {
	m := INFINITE
	for _, i := range a {
		if i < m {
			m = i
		}
	}
	return m
}
