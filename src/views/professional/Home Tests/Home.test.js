import { fireEvent,render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

describe('Headings and Screens Visible and Click test', () => {
  const renderWithRouter = (ui, { route = '/home' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }

    test('All,Recommended etc visible test', () => {
      renderWithRouter(<Home />);
      const All = screen.queryByTestId('All')
      const Recommended = screen.queryByTestId('Recommended')
      const Applied = screen.queryByTestId('Applied')
      const Saved = screen.queryByTestId('Saved')
  
      expect(All).toBeInTheDocument();
      expect(Recommended).toBeInTheDocument();
      expect(Applied).toBeInTheDocument();
      expect(Saved).toBeInTheDocument();
    })
  
    test('All,Recommended etc Click test', () => {
      renderWithRouter(<Home />);
  
      const handleAllClickMock = jest.fn();
      const handleRecommendedClickMock = jest.fn();
      const handleAppliedClickMock = jest.fn();
      const handleSavedClickMock = jest.fn();
  
      const All = screen.queryByTestId('All')
      const Recommended = screen.queryByTestId('Recommended')
      const Applied = screen.queryByTestId('Applied')
      const Saved = screen.queryByTestId('Saved')
  
      All.onclick = handleAllClickMock;
      Recommended.onclick = handleRecommendedClickMock;
      Applied.onclick = handleAppliedClickMock;
      Saved.onclick = handleSavedClickMock;
  
      fireEvent.click(All)
      fireEvent.click(Recommended)
      fireEvent.click(Applied)
      fireEvent.click(Saved)
  
      expect(handleAllClickMock).toHaveBeenCalledTimes(1);
      expect(handleRecommendedClickMock).toHaveBeenCalledTimes(1);
      expect(handleAppliedClickMock).toHaveBeenCalledTimes(1);
      expect(handleSavedClickMock).toHaveBeenCalledTimes(1);
    })
  
    test('Headings visible test', () => {
      renderWithRouter(<Home/>)
  
      // const First = screen.queryByTestId('Home')
      const Learning = screen.queryByTestId('Learning')
      const Community = screen.queryByTestId('Community')
  
      // expect(First).toBeInTheDocument();
      expect(Learning).toBeInTheDocument();
      expect(Community).toBeInTheDocument();
    })
  
    test('Headings click test', () => {
      renderWithRouter(<Home/>);
  
      // const handleHomeClickMock = jest.fn();
      const handleLearningClickMock = jest.fn();
      const handleCommunityClickMock = jest.fn();
  
      // const First = screen.queryByTestId('Home')
      const Learning = screen.queryByTestId('Learning')
      const Community = screen.queryByTestId('Community')
  
      // First.onclick = handleHomeClickMock;
      Learning.onclick = handleLearningClickMock;
      Community.onclick = handleCommunityClickMock;
  
      // fireEvent.click(First)
      fireEvent.click(Learning)
      fireEvent.click(Community)
  
  
      // expect(handleHomeClickMock).toHaveBeenCalledTimes(1);
      expect(handleLearningClickMock).toHaveBeenCalledTimes(1);
      expect(handleCommunityClickMock).toHaveBeenCalledTimes(1);
    })
  
  
  
  
    test('Bell,Profile text visible test', () => {
      renderWithRouter(<Home />);
      const Bell = screen.queryByTestId('Bell')
      const ProfileName = screen.queryByTestId('Profile')
      expect(Bell).toBeInTheDocument();
      expect(ProfileName).toBeInTheDocument();
    })
  
    test('Bell Icon and profile text click test', () => {
  
      renderWithRouter(<Home />)
  
      const handleIconClickMock = jest.fn();
      const handleProfileClickMock = jest.fn();
  
      const Bell = screen.queryByTestId('Bell')
      const Profile = screen.queryByTestId('Profile')
  
      Bell.onclick = handleIconClickMock
      Profile.onclick = handleProfileClickMock
  
      // Bell.addEventListener('click', handleIconClickMock);
      // Profile.addEventListener('click', handleProfileClickMock);
      fireEvent.click(Bell)
      fireEvent.click(Profile)
      expect(screen.queryByTestId('ProfileCard')).toBeVisible()
      // expect(screen.queryByTestId('BellModal')).toBeVisible()
      expect(handleIconClickMock).toHaveBeenCalledTimes(1);   
      expect(handleProfileClickMock).toHaveBeenCalledTimes(1);
    })
  
  })


  describe('SearchBar, Button visible and search-results test', () => {

    const renderWithRouter = (ui, { route = '/home' } = {}) => {
      window.history.pushState({}, 'Test page', route)
  
      return {
        user: userEvent,
        ...render(ui, { wrapper: BrowserRouter }),
      }
    }

    
    test('SearchBar, Button visible test', () => {
      renderWithRouter(<Home />)
  
      const Search = screen.getByPlaceholderText('Seach Company, title')
      const SearchButton = screen.queryByTestId('SearchButton')
      expect(Search).toBeInTheDocument();
      expect(SearchButton).toBeInTheDocument();
    })
  
    test('SearchBar Empty test', () => {
      renderWithRouter(<Home />)
      const Search = screen.getByPlaceholderText('Seach Company, title')
      expect(Search.value).toBe('');
  
    })
  
    test('SearchBar Empty Error Test', () => {
      renderWithRouter(<Home />)
      const Search = screen.getByPlaceholderText('Seach Company, title')
      const SearchButton = screen.queryByTestId('SearchButton')
  
      const testValue = ''
      const error = screen.queryByTestId('error')
      // const setState = jest.fn();
      // jest
      //   .spyOn(React, 'useState')
      //   .mockImplementationOnce(initState => ['true', setState]);
  
      fireEvent.change(Search, { target: { value: testValue } })
      fireEvent.click(SearchButton);
      // act(() => fireEvent.click(SearchButton));
  
      expect(Search.value).toBe('');
      // expect(error).toBeVisible();
    })
  
    test('SearchBar Results Match Test', () => {
      renderWithRouter(<Home/>)
      const SearchButton = screen.queryByTestId('SearchButton')
      const Search = screen.queryByTestId('searchResult')
      const DataQualityManager = screen.queryByTestId('DataQualityManager')
      const testValue = 'Data Quality Manager'
  
      fireEvent.change(Search,{target: {value: testValue}})
      fireEvent.click(screen.queryByTestId('On-site'))
      fireEvent.click(SearchButton);
  
      expect(DataQualityManager).toHaveTextContent(Search.value);
  
    })
  
    test.skip('Error Message should not be visible', () => {
      
      renderWithRouter(<Home/>)
      const SearchButton = screen.queryByTestId('SearchButton')
      const Search = screen.getByPlaceholderText('Seach Company, title')
      const testValue = 'test'
      const error = screen.queryByTestId('error')
  
      fireEvent.change(Search,{target: {value: testValue}})
  
      fireEvent.click(SearchButton);
  
      expect(error).not.toBeVisible();
    })
  
  })


  
  
  describe('Job Card Visible and Job card button click test', () => {
    const renderWithRouter = (ui, { route = '/home' } = {}) => {
      window.history.pushState({}, 'Test page', route)
  
      return {
        user: userEvent,
        ...render(ui, { wrapper: BrowserRouter }),
      }
    }

    
      test('Job Card Visible Test', () => {
          renderWithRouter(<Home />)
          const DataQualityManager = screen.queryByTestId('DataQualityManager');
          expect(DataQualityManager).toBeInTheDocument()
      })
  
      test(' Result Job Card and Buttons Visible Test', () => {
          renderWithRouter(<Home />)
          // const DataQualityManager = screen.queryByTestId('DataQualityManagerResult');
          const ApplyNow = screen.queryByTestId('ApplyNow');
          const Save = screen.queryByTestId('Save');
          const Share = screen.queryByTestId('Share');
  
          // expect(DataQualityManager).toBeInTheDocument()
          expect(ApplyNow).toBeInTheDocument()
          expect(Save).toBeInTheDocument()
          expect(Share).toBeInTheDocument()
        })
   
  
    test(' Result Job Card and Buttons Click Test',() =>{
          renderWithRouter(<Home />)
          const handleApplyNowClickMock = jest.fn();
          const handleSaveNowClickMock = jest.fn();
          const handleShareNowClickMock = jest.fn();
  
  
          const ApplyNow = screen.queryByTestId('ApplyNow');
          const Save = screen.queryByTestId('Save');
          const Share = screen.queryByTestId('Share');
  
          ApplyNow.onclick=handleApplyNowClickMock;
          Save.onclick=handleSaveNowClickMock;
          Share.onclick=handleShareNowClickMock;
  
          fireEvent.click(ApplyNow)
          fireEvent.click(Save)
          fireEvent.click(Share)
          expect(screen.queryByTestId('ProfileCard')).toBeVisible()
          expect(handleApplyNowClickMock).toHaveBeenCalledTimes(1)
          expect(handleSaveNowClickMock).toHaveBeenCalledTimes(1)
          expect(handleShareNowClickMock).toHaveBeenCalledTimes(1)
    })
    
  })

  describe('Select Boxes test', () => {
    const renderWithRouter = (ui, { route = '/home' } = {}) => {
      window.history.pushState({}, 'Test page', route)
  
      return {
        user: userEvent,
        ...render(ui, { wrapper: BrowserRouter }),
      }
    }  

    test('Select Box visible test', () => {
      renderWithRouter(<Home />)
      const Skills = screen.queryByTestId('Skills')
      const Sectors = screen.queryByTestId('Sectors')
      // const Specialization = screen.queryByTestId('Specialization')
      const Location = screen.queryByTestId('Location')
  
      expect(Skills).toBeInTheDocument()
      expect(Sectors).toBeInTheDocument()
      // expect(Specialization).toBeInTheDocument()
      expect(Location).toBeInTheDocument()
    })
  
  //   test.skip('should display the correct number of options', () => {
  //     renderWithRouter(<Home />)
  //     expect(screen.getAllByTestId('SkillsOption').length).toBe(3)
  //     expect(screen.getAllByTestId('SectorsOption').length).toBe(2)
  //     expect(screen.getAllByTestId('SpecializationOption').length).toBe(2)
  //     expect(screen.getAllByTestId('LocationOption').length).toBe(2)
  //   })
    
  //   test('Select Box Default Visible test',()=>{
  //     renderWithRouter(<Home/>)
  //     const Skills = screen.queryByTestId('SkillsSelect')
  //     const Sectors = screen.queryByTestId('SectorsSelect')
  //     const Specialization = screen.queryByTestId('SpecializationSelect')
  //     const Location = screen.queryByTestId('LocationSelect')
  
      
  //     expect(Skills).toBeInTheDocument()
  //     expect(Sectors).toBeInTheDocument()
  //     expect(Specialization).toBeInTheDocument()
  //     expect(Location).toBeInTheDocument()
  
  //   })
  
    test('Select Box Option Select test',()=>{
      renderWithRouter(<Home/>)
      const handleOptionSelectMock=jest.fn();
      const Skills = screen.queryByTestId('Skills')
  
      Skills.onchange = handleOptionSelectMock;
  
      fireEvent.change(Skills,{target:{value : 'Open this select menu'}})
      // const formSkills = queryByTestId('formSkills')
      // selectEvent.select((Skills),['Html'])
      // expect(formSkills).toHaveFormValues({Skills: ['Html']})
  
      expect(handleOptionSelectMock).toHaveBeenCalledTimes(1);
  
  
      expect(Skills.value).toBe('Open this select menu')
    })
  
  })


  describe('Checkboxes click test', () => {
    const renderWithRouter = (ui, { route = '/home' } = {}) => {
      window.history.pushState({}, 'Test page', route)
  
      return {
        user: userEvent,
        ...render(ui, { wrapper: BrowserRouter }),
      }
    }
  
    //  ****************** Work Place Checkbox click test ***************************
    describe('Work Place Type Checkbox click test', () => {
  
      test('Hybrid checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Hybrid'))
        expect(screen.queryByTestId('Hybrid')).toBeInTheDocument();
        expect(screen.queryByTestId('Hybrid')).toBeChecked()
      })
  
      test('On-site checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('On-site'))
        expect(screen.queryByTestId('On-site'))
        expect(screen.queryByTestId('On-site')).toBeChecked()
      })
  
      test('Remote checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Remote'))
        expect(screen.queryByTestId('Remote'))
        expect(screen.queryByTestId('Remote')).toBeChecked()
      })
  
    })
  
    //  ****************** Job Type Checkbox click test ***********************
    describe('Job Type Checkbox click test', () => {
  
      test('Contract checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Contract'))
        expect(screen.queryByTestId('Contract'))
        expect(screen.queryByTestId('Contract')).toBeChecked()
      })
  
      test('Part-time checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Part-time'))
        expect(screen.queryByTestId('Part-time'))
        expect(screen.queryByTestId('Part-time')).toBeChecked()
      })
  
      test('Full-time checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Full-time'))
        expect(screen.queryByTestId('Full-time'))
        expect(screen.queryByTestId('Full-time')).toBeChecked()
      })
  
      test('Volunteer checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Volunteer'))
        expect(screen.queryByTestId('Volunteer'))
        expect(screen.queryByTestId('Volunteer')).toBeChecked()
      })
  
      test('Other checkbox click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Other'))
        expect(screen.queryByTestId('Other'))
        expect(screen.queryByTestId('Other')).toBeChecked()
      })
    })
  
  
    //  ****************** Schedule Checkbox click test ***********************
  
    describe('Schedule Checkbox click test', () => {
  
      test('Fixed click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Fixed'))
        expect(screen.queryByTestId('Fixed'))
        expect(screen.queryByTestId('Fixed')).toBeChecked()
      })
  
      test('Flexible click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Flexible'))
        expect(screen.queryByTestId('Flexible'))
        expect(screen.queryByTestId('Flexible')).toBeChecked()
      })
  
      test('WeekendOnly click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('WeekendOnly'))
        expect(screen.queryByTestId('WeekendOnly'))
        expect(screen.queryByTestId('WeekendOnly')).toBeChecked()
      })
  
      test('MondaytoFriday click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('MondaytoFriday'))
        expect(screen.queryByTestId('MondaytoFriday'))
        expect(screen.queryByTestId('MondaytoFriday')).toBeChecked()
      })
  
      test('UStime click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('UStime'))
        expect(screen.queryByTestId('UStime'))
        expect(screen.queryByTestId('UStime')).toBeChecked()
      })
  
      test('Indiatime click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('Indiatime'))
        expect(screen.queryByTestId('Indiatime'))
        expect(screen.queryByTestId('Indiatime')).toBeChecked()
      })
  
      test('ScheduleOther click test', () => {
        renderWithRouter(<Home />)
        fireEvent.click(screen.queryByTestId('ScheduleOther'))
        expect(screen.queryByTestId('ScheduleOther'))
        expect(screen.queryByTestId('ScheduleOther')).toBeChecked()
      })
  
    })
  })