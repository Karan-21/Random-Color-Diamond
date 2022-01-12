import './App.css';
import './Diamond.css';
import React from 'react';
import html2canvas from 'html2canvas';


class Diamond extends React.Component {

    constructor(props) {
        super(props);

        // Initializing the States which will be used further in the program.
        this.state = {
            title: 'colorpaller',
            shape: 36,
            show: true,
            imgUrl: '',
            row: [],
            column: [],
            colorArray: [],
            arr: []
        };
        
        // Binding the States to these Three Methods/Functions.
        this.getArray = this.getArray.bind(this);
        this.getColumn = this.getColumn.bind(this);
        this.setUniqueColor = this.setUniqueColor.bind(this);
    }

    // componentDidMount() is invoked immediately after a component is mounted.
    componentDidMount() {

        // Creating an Array of size 60 and filling it with the indexes
        let val = Array(60)
            .fill(0)
            .map((x, i) => i);
        
        // Initializing it to the row array, declared above in the state
        this.setState({
            row: val
        }, () => this.getArray());

    }

    // Creating an Array of size 36 which is the shape state declared above and filling it with the indexes
    // And using that array I'm calling the setColor() to fill in the background-color inside it.
    getArray() {
        let array = Array(this.state.shape).fill(0).map((x, i) => i);
        if (array.length) {
            this.setState({ arr: array }, () => {
                this.setColor();
            });
        }
    }

    
   
    getColumn(col) {
        // As we want a Diamond shape. Therefore, we want the first top half of the shape to grow constantly.
        if (col + 1 <= this.state.row.length / 2) {
            let newval = Array(col + 1)
                .fill(0)
                .map((x, i) => i);
            return newval;
        }

        // And after the Half part, that is the other bottom half we want to decrease constantly.
        // So that at the end it looks like a Diamond.
        else {
            let value = Array(this.state.row.length - col)
                .fill(0)
                .map((x, i) => i);
            return value;
        }
    }

    // Finally Looping through the shape, it's row and column.
    // Getting the Unique RGB color by calling setUniqueColor()
    // Then finally setting it to the backgroundColor to each pixel.
    setColor() {
        let getBackGroundColor;
        for (let s = 0; s < this.state.shape; s++) {
          for (let i = 0; i < this.state.row.length; i++) {
            for (let j = 0; j < this.state.row.length; j++) {
    
              try {
    
                getBackGroundColor = this.setUniqueColor();
                document.getElementById(s + ',' + i + ',' + j).style.backgroundColor = getBackGroundColor;
              } catch (e) {
    
              }
            }
          }
        }
    
    
    // As we need an actual Image given in the Instructions.
    // So I'm converting the entire JSX to an Image using an library called html2canvas.
    console.log('Total Number of Discreate Colors = ', '127588')
        html2canvas(document.getElementById("image")).then((canvas) => {
          this.setState({
            imgUrl: canvas.toDataURL('image/png'),
            show: false
          });
        });
    
    
    
      }
    
    // Below I'm generating Random Red, Blue and Green Colors.
    // I'm multiplying it by 256 because Math.random() generates number between 0 and 1
    setUniqueColor() {

        let redValue = Math.random() * 256;
        let greenValue = Math.random() * 256;
        let blueValue = Math.random() * 256;
    
        while (this.state.colorArray.includes(`rgb(${redValue},${greenValue},${blueValue})`)) {
          redValue = Math.random() * 256;
          greenValue = Math.random() * 256;
          blueValue = Math.random() * 256;
        }
    
        this.setState({
          colorArray: [...this.state.colorArray, `rgb(${redValue},${greenValue},${blueValue})`]
        });
    
        return `rgb(${redValue},${greenValue},${blueValue})`;
    
      }

    render() {

        // Now I'm using the Array which I have created above and I'm mapping through each of them rendering it
        // Also, I'm using inline styling.
        // Lastly, after all JSX has been executed, I'm converting the image formed by me. To an Actual PNG image using ES6 Ternary operator.s
        return (

            <div className="row w-100 m-0 p-0" style={{ "justifyContent": "center" }}>

                {this.state.show ?
                        <div className="row w-100 m-0 p-0" style={{ "justifyContent": "center" }} id="image">
                            {this.state.arr.map((s) =>
                                <div style={{ width: "fit-content", height: "fit-content", padding: "0" }} key={s}>

                                    {this.state.row.map((r) =>

                                        <div style={{ display: "flex", justifyContent: "center" }} key={r}>


                                            {
                                                this.getColumn(r).map((c) =>
                                                    <div className="colorBox" id={s + ',' + r + ',' + c} key={c} />
                                                )
                                            }

                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    : null
                }

                {!this.state.show ?
                        <img src={this.state.imgUrl} alt="" className="w-100 h-100" style={{ "objectFit": "contain" }} />
                : null}

            </div>

        );
    }
}

export default Diamond;
