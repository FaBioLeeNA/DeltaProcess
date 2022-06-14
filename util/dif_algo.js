const dif_algo = (a, b) => {
  let result = [[],[],[]]
  let a_index = 0;
  let b_index = 0;
  
  if (Array.isArray(b[b_index])) {
    while (a_index < a.length) {
      if (b_index >= b.length) {
        result[0].push(a[a_index++])
      } else if (+a[a_index][0] == +b[b_index][0]) {
        result[1].push(a[a_index++])
        b_index++
      } else if (+a[a_index][0] > +b[b_index][0]) {
        result[2].push(b[b_index++])
      } else {
        result[0].push(a[a_index++])
      }
    }
  } else {
    while (a_index < a.length) {
      if  (b_index >= b.length) {
        result[0].push(a[a_index++])
      } else if (+a[a_index][0] == +b[b_index]) {
        result[1].push(a[a_index++])
        b_index++
      } else if (+a[a_index][0] > +b[b_index]) {
        result[2].push(b[b_index++])
      } else {
        result[0].push(a[a_index++])
      }
    }
  }

  return result
}

module.exports = dif_algo;

const test = (a, b) => {

  let res = dif_algo(a, b)
  let ans = a.filter(x => !b.includes(x[0]))

  if (res.length != ans.length) {
    return `length do not match\nans: ${ans}\nres: ${res}`
  }

  for (let i = 0; i < ans.length; i++) {
    if (ans[i] != res[i]){
      return `fail\nans: ${ans}\nres: ${res}`
    }
  }
  return 'pass'
}
  
// input: [1,3,4,5,6,7], [1,2,5,7]
// output: [3,4,6]
// 1 1 -> increase both indexes
// 3 2 -> increase b index
// 3 5 -> push 3, increase a index
// 4 5 -> push 4, increase a index
// 5 5 -> increase both indexes
// 6 7 -> push 6, increase a index
// 7 7 -> increase both indexes

// console.log(test([[1,"a"],[3,"b"],[4,"a"],[5,"a"],[6,"a"],[7,"a"]], [1,2,5,7]))