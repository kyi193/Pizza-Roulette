import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GestureSpinnerWheel from '../components/GestureSpinnerWheel'

Enzyme.configure({ adapter: new Adapter() })

describe("GestureSpinnerWheel component", () => {
  test("renders", () => {
    const wrapper = shallow(<GestureSpinnerWheel />)

    expect(wrapper.exists()).toBe(true)
  })
})
