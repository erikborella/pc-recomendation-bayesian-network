import array
import re
import numpy as np
import networkx as nx

from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD

# Utilities
rhs = lambda s : re.match(r".*(.*) = (.*).*", s).group(2).strip(";")
my_tuple_reader = lambda s : list(filter(lambda s : len(s) > 0, 
                                         s.strip("()").replace(" ", "").split(",")))
find_floats = lambda s : list(map(float,re.findall(r'\d+(?:\.\d+)?', s)))

def read_dne(dne_file_location):
  # Read file content
  with open(dne_file_location, 'r') as file:
    lines = file.readlines()
  
  # Iterate and read the nodes
  node_names = {}
  node_states = {}
  raw_edges = []
  raw_probs = {}

  lines = iter(lines)
  for line in lines:
    if line.startswith("node"):
      current_node = line.split()[1]

    elif re.match(r".*states =.*", line):
      node_states[current_node] = my_tuple_reader(rhs(line))

    elif re.match(r".*parents =.*", line):
      parents = my_tuple_reader(rhs(line))
      for parent in parents:
        raw_edges.append((parent, current_node))
    
    elif re.match(r".*title =.*", line):
      node_names[current_node] = rhs(line).strip("\"")
    
    elif re.match(r".*probs =.*", line):
      prob_header = next(lines)
      m = re.match(r"[ \t]*\/\/([^\/\n]*)(\/\/.*)?", prob_header)
      states = re.split('\s+', m.group(1).strip())
      parents = m.group(2)
      if parents is not None:
        parents = parents.strip().strip(r"//").split()
      
      prob_line = next(lines)
      probs = []
      parent_states = [] if parents is not None else None
      while True:
        numbers = find_floats(prob_line)
        probs.append(numbers)
        if parents is not None:
          parent_states.append(re.match(r".*\/\/ (.*) ;?", prob_line).group(1).split())
        if re.match(r".*(\/\/)?.*;", prob_line):
          break
        else:
          prob_line = next(lines)
      probs = np.array(probs)
      raw_probs[current_node] = {"probs" : probs, 
                                 "states" : states, 
                                 "parent_aliases" : parents,
                                 "parent_states" : parent_states}
  

  # Process conditional probability tables
  cpds = []
  for node_alias, rp in raw_probs.items():
    variable = node_names[node_alias]
    variable_card = len(node_states[node_alias])
    values = rp["probs"].T
    state_names = {variable : node_states[node_alias]}
    if rp["parent_aliases"] is not None:
      evidence = [node_names[parent_alias] for parent_alias in rp["parent_aliases"]]
      evidence_card = [len(node_states[parent_alias]) for parent_alias in rp["parent_aliases"]]
      state_names.update({node_names[parent_alias] : node_states[parent_alias] for parent_alias in rp["parent_aliases"]})
    else:
      evidence = None
      evidence_card = None

    cpd = TabularCPD(variable, 
                     variable_card, 
                     values, 
                     evidence, 
                     evidence_card,
                     state_names)
    cpds.append(cpd)
  
  # Bake model
  edges = [(node_names[na1], node_names[na2]) for (na1, na2) in raw_edges]
  model = BayesianNetwork(edges)
  model.add_cpds(*cpds)
  model.check_model()

  return model

from pgmpy.inference import VariableElimination
import numpy as np

if __name__ == "__main__":
  # model = read_dne("/home/erikborella/Documentos/bayers/final2.dne")

  # model.save("compiled-network.bif")

  model = BayesianNetwork.load('./model/compiled-model.bif')

  model_infer = VariableElimination(model)

  # q = model_infer.map_query(variables=['Chosen_CPU', 'CPU_Usage', 'Chosen_RAM', 'RAM_Usage', 'GPU_Usage', 'Chosen_GPU'], evidence={'Usage': 'General', 'Price': 'High'})
  # print(q)

  # vevid = TabularCPD(variable='Usage',
  #                    variable_card=4,
  #                    state_names={'Usage': ['General', 'Programing', 'VideoEditing', 'Gaming']},
  #                    values=[[0.5], [0], [0.5], [0]])
  
  # q = model_infer.query(variables=['Chosen_CPU', 'CPU_Usage', 'Chosen_RAM', 'RAM_Usage', 'GPU_Usage', 'Chosen_GPU'], virtual_evidence=[vevid], joint=False)
  # for inf in q.values():
  #   print(inf)