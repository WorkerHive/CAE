#include <stdio.h>

#include <TDocStd_Document.hxx>
#include <STEPCAFControl_Reader.hxx>
#include <XCAFDoc_ShapeTool.hxx>
#include <XCAFDoc_DocumentTool.hxx>
#include <TDF_LabelSequence.hxx>
#include <TopoDS_Compound.hxx>
#include <TopoDS_Shape.hxx>
#include <BRep_Builder.hxx>
#include <TDF_Label.hxx>
#include <TCollection_AsciiString.hxx>
#include <NCollection_IndexedDataMap.hxx>
#include <RWGltf_CafWriter.hxx>



int main(){

  Handle(TDocStd_Document) xdeDoc;

  STEPCAFControl_Reader aReader;
  if(!(aReader.ReadFile("./GA.stp") != IFSelect_RetDone)){ /*parse error*/ }
  if(!aReader.Transfer(xdeDoc)) { /*translation error*/ }
  
  Handle(XCAFDoc_ShapeTool) aShapeTool = XCAFDoc_DocumentTool::ShapeTool(xdeDoc->Main());

  TDF_LabelSequence aRootLabels;
  aShapeTool->GetFreeShapes(aRootLabels);

  TopoDS_Compound aCompound;
  BRep_Builder aBuildTool;
  aBuildTool.MakeCompound(aCompound);

  for (TDF_LabelSequence::Iterator aRootIter (aRootLabels); aRootIter.More(); aRootIter.Next()){
    const TDF_Label& aRootLabel = aRootIter.Value();
    TopoDS_Shape aRootShape;
    if(XCAFDoc_ShapeTool::GetShape(aRootLabel, aRootShape)){
      aBuildTool.Add(aCompound, aRootShape);
    }
  }

//  Handle(Prs3d_Drawer) aDrawer = new Prs3d_Drawer();
  
  TColStd_IndexedDataMapOfStringString aMetadata;
  RWGltf_CafWriter aGltfWriter("exported.glb", true);
  aGltfWriter.ChangeCoordinateSystemConverter().SetInputLengthUnit(0.001);
  aGltfWriter.ChangeCoordinateSystemConverter().SetInputCoordinateSystem(RWMesh_CoordinateSystem_Zup);
  if(!aGltfWriter.Perform(xdeDoc, aMetadata, Handle(Message_ProgressIndicator)()) {
    printf("Export error\n")
  }
  return 0;
}
