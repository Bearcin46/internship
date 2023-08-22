import React, { useState } from 'react';
import { Checkbox, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import { Department } from './type';
import './Home.css';

//receiving the props
interface CheckboxListProps {
  departments: Department[];
}

const DataList: React.FC<CheckboxListProps> = ({ departments }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  //selecting and deselecting items
  const handleItemClick = (item: string) => {
    const isSelected = selectedItems.includes(item);
    let updatedSelectedItems: string[] = [];

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      updatedSelectedItems = [...selectedItems, item];
    }

    setSelectedItems(updatedSelectedItems);
  };

  const handleDepartmentClick = (department: string) => {
    const isSelected = selectedItems.includes(department);

    let updatedSelectedItems: string[] = [];

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem !== department);
    } else {
      const subDepartments = departments.find(dept => dept.department === department)?.sub_departments || [];
      const subDepartmentsNotSelected = subDepartments.filter(subDept => !selectedItems.includes(subDept));

      updatedSelectedItems = [...selectedItems, department, ...subDepartmentsNotSelected];
    }

    setSelectedItems(updatedSelectedItems);
  };
//all subdepartents
  const isAllSubDepartmentsSelected = (department: string) => {
    const subDepartments = departments.find(dept => dept.department === department)?.sub_departments || [];
    return subDepartments.every(subDept => selectedItems.includes(subDept));
  };

  const isIndeterminate = (department: string) => {
    const subDepartments = departments.find(dept => dept.department === department)?.sub_departments || [];
    return subDepartments.some(subDept => selectedItems.includes(subDept)) && !isAllSubDepartmentsSelected(department);
  };

  const handleSelectAllSubDepartments = (department: string) => {
    const subDepartments = departments.find(dept => dept.department === department)?.sub_departments || [];
    let updatedSelectedItems: string[] = [];

    if (isAllSubDepartmentsSelected(department)) {
      updatedSelectedItems = selectedItems.filter(item => !subDepartments.includes(item));
    } else {
      updatedSelectedItems = [...selectedItems, ...subDepartments];
    }

    setSelectedItems(updatedSelectedItems);
  };
//returning a list
  return (
    <List>
      <h1>Below are the Lists</h1>
      {departments.map(dept => (
        <div key={dept.department}>
          <ListItemButton>
            {selectedItems.includes(dept.department) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedItems.includes(dept.department)}
                indeterminate={isIndeterminate(dept.department)}
                onChange={() => handleDepartmentClick(dept.department)}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${dept.department} (${dept.sub_departments.length})`}
              onClick={() => handleSelectAllSubDepartments(dept.department)}
              style={{ cursor: 'pointer' }}
            />
          </ListItemButton>
          <Collapse in={selectedItems.includes(dept.department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map(subDept => (
                <ListItemButton key={subDept}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems.includes(subDept)}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleItemClick(subDept)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DataList;

